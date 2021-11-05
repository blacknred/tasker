import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AgentsService } from 'src/agents/agents.service';
import { ObjectID } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class AgentInterceptor implements NestInterceptor {
  constructor(private readonly agentsService: AgentsService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const { uid, ...rest } = context.switchToRpc().getData();
    const wid = (rest.wid | rest.id) as unknown as ObjectID;

    if (wid && uid) {
      const params = { wid, uid, limit: 1, userId: uid };
      const { data } = await this.agentsService.findAll(params);

      context.switchToRpc().getContext().agent = data.items[0];
    }

    return next.handle();
  }
}
