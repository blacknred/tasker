import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IAuth } from '@taskapp/shared';
import type { Request } from 'express';
import { PERMISSION_KEY } from '../consts';
import { ProjectRoleGuard } from './project-role.guard';

@Injectable()
export class ProjectPermissionGuard extends ProjectRoleGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(ctx: ExecutionContext): boolean {
    const claims = this.reflector.getAllAndOverride(PERMISSION_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!claims) return true;

    super.canActivate(ctx);

    const { user, params } = ctx.switchToHttp().getRequest() as Request;
    return claims.every((p) =>
      (user as IAuth).permissions[params.id].includes(p),
    );
  }
}
