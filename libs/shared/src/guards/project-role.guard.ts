import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import type { IAuth } from '../interfaces';

@Injectable()
export class ProjectRoleGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    const { user, params } = ctx.switchToHttp().getRequest() as Request;
    return (user as IAuth).permissions.has(params.id);
  }
}
