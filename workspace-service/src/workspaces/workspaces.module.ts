import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Agent } from 'src/agents/entities/agent.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Saga } from 'src/sagas/entities/saga.entity';
import { Task } from 'src/tasks/entities/task.entity';
import { Workspace } from './entities/workspace.entity';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature([Workspace, Role, Agent, Task, Saga]),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
