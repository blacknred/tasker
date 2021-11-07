import {
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RpcException } from '@nestjs/microservices';
import { AgentsService } from 'src/agents/agents.service';
import { IAgent } from 'src/agents/interfaces/agent.interface';
import { PRIVILEGE_KEY } from '../consts';
import { AgentGuard } from './agent.guard';

@Injectable()
export class PrivilegeGuard extends AgentGuard {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AgentsService) protected readonly agentsService: AgentsService,
  ) {
    super(agentsService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const privileges = this.reflector.getAllAndOverride(PRIVILEGE_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!privileges) return true;
      await super.canActivate(context);

      const { role } = context.switchToRpc().getContext().agent as IAgent;

      return privileges.every((privilege) =>
        role?.privileges.includes(privilege),
      );
    } catch (_) {
      throw new RpcException({
        status: HttpStatus.FORBIDDEN,
      });
    }
  }
}
