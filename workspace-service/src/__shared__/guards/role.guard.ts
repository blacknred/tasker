import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { ROLES_KEY } from '../consts';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly workspacesService: WorkspacesService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const roles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!roles) return true;

      const { userId } = context.switchToRpc().getData();

      if (!userId) return true;

      const agentRoles = await this.workspacesService.getAgentRoles(userId);

      return agentRoles.some((role) => roles.includes(role.name));
    } catch (_) {
      throw new ForbiddenException('Access restricted');
    }
  }
}

// @Roles(UserRole.ADMIN)
// @UseGuards(RoleGuard)
