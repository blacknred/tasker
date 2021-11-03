import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentsModule } from './agents/agents.module';
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
      }),
    }),
    WorkspacesModule,
    AgentsModule,
    SagasModule,
    TasksModule,
  ],
  providers: [
    databaseProvider,
    // {
    //   provide: APP_INTERCEPTOR,
    //   scope: Scope.REQUEST,
    //   useClass: AgentInterceptor,
    // },
  ],
})
export class AppModule {}
