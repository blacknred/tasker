import * as Joi from '@hapi/joi';
import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { SagasModule } from './sagas/sagas.module';
import { TasksModule } from './tasks/tasks.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { AgentInterceptor } from './__shared__/interceptors/agent.interceptor';
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
