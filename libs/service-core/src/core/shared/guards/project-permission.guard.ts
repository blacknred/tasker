import {
  ExecutionContext, Injectable
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectPermission } from '@taskapp/types';
import { PERMISSION_KEY } from '../consts';
import { ProjectMemberGuard } from './project-member.guard';

@Injectable()
export class ProjectPermissionGuard extends ProjectMemberGuard {
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
     
    const permissions = ctx.switchToHttp().getRequest().headers['x-project-permissions'] as ProjectPermission[];
    return claims.every((p) => permissions.includes(p));
  }
}
