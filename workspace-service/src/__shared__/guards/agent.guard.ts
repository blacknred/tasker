import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AgentGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    return !!ctx.switchToRpc().getContext().agent;
  }
}
