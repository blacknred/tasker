import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Scope,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { ObjectID } from 'typeorm';

@Injectable({ scope: Scope.REQUEST })
export class AgentInterceptor implements NestInterceptor {
  constructor(private readonly workspacesService: WorkspacesService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<unknown>> {
    const { workspaceId, id, userId } = context.switchToRpc().getData();
    const wid = (workspaceId | id) as unknown as ObjectID;

    if (wid && userId) {
      context.switchToRpc().getContext().agent =
        await this.workspacesService.findAgent(wid, userId);
    }

    return next.handle();
  }
}
