import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { PRIVILEGE_KEY } from '../consts';
import { AgentGuard } from './agent.guard';

@Injectable()
export class PrivilegeGuard extends AgentGuard {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      const privileges = this.reflector.getAllAndOverride(PRIVILEGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!privileges) return true;

      const agent = context.switchToRpc().getContext().agent as IAgent;

      return (
        super.canActivate(context) &&
        privileges.every((privilege) =>
          agent.role?.privileges.includes(privilege),
        )
      );
    } catch (_) {
      throw new RpcException({
        status: HttpStatus.FORBIDDEN,
      });
    }
  }
}
