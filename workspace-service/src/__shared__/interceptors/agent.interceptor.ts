import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { WorkspacesController } from 'src/workspaces/workspaces.controller';
import { WorkspacesService } from 'src/workspaces/workspaces.service';

@Injectable({ scope: Scope.REQUEST })
export class AgentInterceptor implements NestInterceptor {
  constructor(private readonly workspacesService: WorkspacesService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const target = context.getClass();
    const data = context.switchToRpc().getData();
    const { name } = WorkspacesController;

    const prop = target.name === name ? 'id' : 'workspaceId';

    if (data[prop] && data.userId) {
      context.switchToRpc().getContext().agent =
        await this.workspacesService.findAgent(data[prop], data.userId);
    }

    return next.handle();
  }
}
