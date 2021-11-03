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
    const { wid, id, uid } = context.switchToRpc().getData();
    const workspaceId = (wid | id) as unknown as ObjectID;

    if (workspaceId && uid) {
      context.switchToRpc().getContext().agent =
        await this.workspacesService.findAgent(workspaceId, uid);
    }

    return next.handle();
  }
}
