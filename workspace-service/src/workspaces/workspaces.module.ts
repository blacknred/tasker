import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Workspace } from './entities/workspace.entity';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { Role } from 'src/roles/entities/role.entity';
import { Agent } from 'src/agents/entities/agent.entity';
import { Saga } from 'src/sagas/entities/saga.entity';
import { Task } from 'src/tasks/entities/task.entity';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature([Workspace, Role, Agent, Saga, Task]),
  ],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
