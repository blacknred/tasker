import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
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

    const req = ctx.switchToHttp().getRequest() as Request;
    const projectId = req.body.projectId || req.params.id;
    const user = req.user as IAuth;

    if (!claims.every((p) => user.permissions[projectId].includes(p))) {
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
