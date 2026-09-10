import { createHash, randomBytes } from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { User, UserRole } from '@prisma/client';
import { verifyPassword } from '../../common/security/password-hasher.js';
import { PrismaService } from '../../database/prisma.service.js';
import type { LoginDto } from './dto/login.dto.js';
import type { SessionResponseDto } from './dto/session-response.dto.js';

interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  sessionId: string;
  type: 'access';
}

@Injectable()
export class AuthService {
  public constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async login(input: LoginDto): Promise<SessionResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: input.email.trim().toLowerCase() },
    });
    if (
      !user?.isActive ||
      !(await verifyPassword(input.password, user.passwordHash))
    ) {
      throw new UnauthorizedException('Correo o contraseña incorrectos.');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });
    return this.createSession(updatedUser);
  }

  public async refresh(refreshToken: string): Promise<SessionResponseDto> {
    const tokenHash = hashRefreshToken(refreshToken);
    const currentSession = await this.prisma.session.findUnique({
      where: { refreshTokenHash: tokenHash },
      include: { user: true },
    });
    if (
      !currentSession ||
      currentSession.revokedAt ||
      currentSession.expiresAt <= new Date() ||
      !currentSession.user.isActive
    ) {
      throw new UnauthorizedException('El token de renovación no es válido.');
    }

    const nextRefreshToken = randomBytes(48).toString('base64url');
    const expiresAt = this.getRefreshExpiration();
    const nextSession = await this.prisma.$transaction(async (transaction) => {
      const revoked = await transaction.session.updateMany({
        where: { id: currentSession.id, revokedAt: null },
        data: { revokedAt: new Date() },
      });
      if (revoked.count !== 1) {
        throw new UnauthorizedException(
          'La sesión ya fue renovada o revocada.',
        );
      }
      return transaction.session.create({
        data: {
          userId: currentSession.userId,
          refreshTokenHash: hashRefreshToken(nextRefreshToken),
          expiresAt,
        },
      });
    });

    return this.buildSessionResponse(
      currentSession.user,
      nextSession.id,
      nextRefreshToken,
    );
  }

  public async logout(userId: string, sessionId: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: {
        id: sessionId,
        userId,
        revokedAt: null,
      },
      data: { revokedAt: new Date() },
    });
  }

  private async createSession(user: User): Promise<SessionResponseDto> {
    const refreshToken = randomBytes(48).toString('base64url');
    const session = await this.prisma.session.create({
      data: {
        userId: user.id,
        refreshTokenHash: hashRefreshToken(refreshToken),
        expiresAt: this.getRefreshExpiration(),
      },
    });
    return this.buildSessionResponse(user, session.id, refreshToken);
  }

  private async buildSessionResponse(
    user: User,
    sessionId: string,
    refreshToken: string,
  ): Promise<SessionResponseDto> {
    const expiresIn = this.configService.getOrThrow<number>(
      'JWT_ACCESS_TTL_SECONDS',
    );
    const payload: AccessTokenPayload = {
      sub: user.id,
      role: user.role,
      sessionId,
      type: 'access',
    };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn,
    });

    return {
      accessToken,
      refreshToken,
      expiresIn,
      user: {
        id: user.id,
        displayName: user.displayName,
        email: user.email,
        role: user.role,
      },
    };
  }

  private getRefreshExpiration(): Date {
    const days = this.configService.getOrThrow<number>(
      'REFRESH_TOKEN_TTL_DAYS',
    );
    return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  }
}

function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}
