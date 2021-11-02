import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { ROLES_KEY } from '../consts';
import { AccessGuard } from './agent.guard';

@Injectable()
export class RoleGuard extends AccessGuard {
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
        agent.role.some((role) => roles.includes(role))
      );
    } catch (_) {
      throw new RpcException({
        status: HttpStatus.FORBIDDEN,
      });
    }
  }
}
// @Roles(BaseRole.ADMIN)
// @UseGuards(RoleGuard)
