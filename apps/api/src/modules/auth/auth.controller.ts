import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CurrentUser } from '../../common/auth/current-user.decorator.js';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard.js';
import type { AuthUser } from '../../common/auth/auth-user.js';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import {
  LogoutResponseDto,
  SessionResponseDto,
} from './dto/session-response.dto.js';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  public constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Inicia sesión con correo y contraseña' })
  @ApiOkResponse({ type: SessionResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Credenciales inválidas o usuario inactivo',
  })
  public login(@Body() input: LoginDto): Promise<SessionResponseDto> {
    return this.authService.login(input);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Rota la sesión y renueva los tokens' })
  @ApiOkResponse({ type: SessionResponseDto })
  public refresh(@Body() input: RefreshTokenDto): Promise<SessionResponseDto> {
    return this.authService.refresh(input.refreshToken);
  }

  @Post('logout')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Revoca la sesión actual' })
  @ApiOkResponse({ type: LogoutResponseDto })
  public async logout(
    @CurrentUser() user: AuthUser,
  ): Promise<LogoutResponseDto> {
    await this.authService.logout(user.id, user.sessionId);
    return { success: true };
  }
}
