import {
  ForbiddenException,
  Injectable,
  type CanActivate,
  type ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import type { UserRole } from '@prisma/client';
import type { Request } from 'express';
import type { AuthUser } from './auth-user.js';
import { ROLES_KEY } from './roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  public canActivate(context: ExecutionContext): boolean {
    const acceptedRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!acceptedRoles?.length) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user: AuthUser }>();
    if (!acceptedRoles.includes(request.user.role)) {
      throw new ForbiddenException(
        'El rol de la sesión no permite esta operación.',
      );
    }
    return true;
  }
}
