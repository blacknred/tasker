import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuth } from '@taskapp/shared';
import type { Request } from 'express';
import { PERMISSION_KEY } from '../consts';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const claims = this.reflector.getAllAndOverride(PERMISSION_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!claims) return true;

    const req = ctx.switchToHttp().getRequest() as Request;
    const user = req.user as IAuth;

    if (!claims.every((p) => user.permissions.includes(p))) {
      throw new ForbiddenException({
        errors: [
          {
            message: 'You have no permission to operation',
            field: 'projectId',
          },
        ],
      });
    }

    return true;
  }
}
