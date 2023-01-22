import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ProjectAccessGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    return !!ctx.switchToHttp().getRequest().headers['x-project-permissions'];
  }
}
