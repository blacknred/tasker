import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import type { Request } from 'express';
import type { IAuth } from '../interfaces';

@Injectable()
export class ProjectRoleGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const req = ctx.switchToHttp().getRequest() as Request;
    const projectId = req.body.projectId || req.params.id;
    const user = req.user as IAuth;

    if (!user.permissions[projectId]?.length) {
      throw new ForbiddenException({
        errors: [
          { message: 'You have no access to project', field: 'projectId' },
        ],
      });
    }

    return true;
  }
}
