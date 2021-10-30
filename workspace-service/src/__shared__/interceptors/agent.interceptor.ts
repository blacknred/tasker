import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable({ scope: Scope.REQUEST })
export class AgentInterceptor implements NestInterceptor {
  constructor(private readonly workspacesService: WorkspacesService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const { workspaceId, userId } = context.switchToRpc().getData();
    const ctx = context.switchToRpc().getContext();

    if (workspaceId && userId) {
      const agent = await this.workspacesService.findAgent(workspaceId, userId);
      ctx.agent = agent;
    }

    return next.handle();
  }
}
