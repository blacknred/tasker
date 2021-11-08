import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { PRIVILEGE_KEY } from '../consts';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const agent = context.switchToRpc().getContext().agent as IAgent;
    const privileges = this.reflector.getAllAndOverride(PRIVILEGE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!privileges) return true;
    if (!agent) return false;

    if (
      !privileges.every((privilege) =>
        agent.role.privileges.includes(privilege),
      )
    ) {
      throw new RpcException({
        status: HttpStatus.FORBIDDEN,
      });
    }

    return true;
  }
}
