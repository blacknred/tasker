import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../consts';
import { AgentGuard } from './agent.guard';

@Injectable()
export class RoleGuard extends AgentGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!roles) return true;

      const { agent } = context.switchToRpc().getContext();

      return (
        super.canActivate(context) &&
        agent.roles.some((role) => roles.includes(role))
      );
    } catch (_) {
      throw new ForbiddenException('Access restricted');
    }
  }
}

// @Roles(UserRole.ADMIN)
// @UseGuards(RoleGuard)
