import {
  Injectable,
  UnauthorizedException,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { UserRole } from '@prisma/client';
import type { Request } from 'express';
import { PrismaService } from '../../database/prisma.service.js';
import type { AuthUser } from './auth-user.js';

interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  sessionId: string;
  type: 'access';
}

type AuthenticatedRequest = Request & { user: AuthUser };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Se requiere un token de acceso.');
    }

    try {
      const payload = await this.jwtService.verifyAsync<AccessTokenPayload>(
        token,
        {
          secret: this.configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
        },
      );
      if (payload.type !== 'access') {
        throw new UnauthorizedException('El token no es un token de acceso.');
      }

      const activeSession = await this.prisma.session.findFirst({
        where: {
          id: payload.sessionId,
          userId: payload.sub,
          revokedAt: null,
          expiresAt: { gt: new Date() },
          user: { isActive: true },
        },
        select: { id: true, user: { select: { role: true } } },
      });
      if (!activeSession) {
        throw new UnauthorizedException('La sesión expiró o fue revocada.');
      }

      request.user = {
        id: payload.sub,
        role: activeSession.user.role,
        sessionId: payload.sessionId,
      };
      return true;
    } catch (error: unknown) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('El token de acceso no es válido.');
    }
  }
}
