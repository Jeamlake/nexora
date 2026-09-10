import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import type { AuthUser } from '../../common/auth/auth-user.js';
import { CurrentUser } from '../../common/auth/current-user.decorator.js';
import { JwtAuthGuard } from '../../common/auth/jwt-auth.guard.js';
import { Roles } from '../../common/auth/roles.decorator.js';
import { RolesGuard } from '../../common/auth/roles.guard.js';
import { ProfileResponseDto } from './dto/profile-response.dto.js';
import { ProfileService } from './profile.service.js';

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class ProfileController {
  public constructor(private readonly profileService: ProfileService) {}

  @Get('profile/me')
  @Roles(UserRole.RESIDENT)
  @ApiOperation({ summary: 'Obtiene el perfil residencial de la sesión' })
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiUnauthorizedResponse({
    description: 'Sesión ausente, expirada o revocada',
  })
  @ApiForbiddenResponse({
    description: 'La sesión no pertenece a un residente',
  })
  @ApiNotFoundResponse({ description: 'No existe un perfil asociado' })
  public findMine(@CurrentUser() user: AuthUser): Promise<ProfileResponseDto> {
    return this.profileService.findMine(user.id);
  }

  @Get('residents')
  @Roles(UserRole.ADMIN_DIRECTIVE)
  @ApiOperation({ summary: 'Lista residentes para administración/directiva' })
  @ApiOkResponse({ type: [ProfileResponseDto] })
  @ApiForbiddenResponse({
    description: 'Solo administración/directiva puede listar',
  })
  public findAll(): Promise<ProfileResponseDto[]> {
    return this.profileService.findAllResidents();
  }
}
