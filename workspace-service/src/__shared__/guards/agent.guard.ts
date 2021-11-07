import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AgentsService } from 'src/agents/agents.service';
import { GetAgentsDto } from 'src/agents/dto/get-agents.dto';

@Injectable()
export class AgentGuard implements CanActivate {
  constructor(
    @Inject(AgentsService) protected readonly agentsService: AgentsService,
  ) {}

  async getAgent(ctx: ExecutionContext) {
    const { uid, ...rest } = ctx.switchToRpc().getData();
    const wid = rest.wid || rest.id;

    if (wid && uid) {
      const params: GetAgentsDto = { wid, uid, limit: 1, userId: uid };
      const { data } = await this.agentsService.findAll(params);
      ctx.switchToRpc().getContext().agent = data.items[0];
    }
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    await this.getAgent(ctx);

    if (!ctx.switchToRpc().getContext().agent) {
      throw new RpcException({
        status: HttpStatus.FORBIDDEN,
      });
    }

    return true;
  }
}
