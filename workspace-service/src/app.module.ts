import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentsModule } from './agents/agents.module';
import { RolesModule } from './roles/roles.module';
import { SagasModule } from './sagas/sagas.module';
import { TasksModule } from './tasks/tasks.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { databaseProvider } from './__shared__/providers/database.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        QUEUE_URL: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync(databaseProvider),
    WorkspacesModule,
    RolesModule,
    AgentsModule,
    SagasModule,
    TasksModule,
  ],
})
export class AppModule {}
