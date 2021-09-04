import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseProvider } from './providers/database.provider';
import { queueProvider } from './providers/queue.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        QUEUE_URL: Joi.string().required(),
        DB_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [TasksController],
  providers: [TasksService, queueProvider, databaseProvider],
  exports: [databaseProvider],
})
export class TasksModule {}
