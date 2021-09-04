import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { queueProvider } from './queue.provider';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        QUEUE_URL: Joi.string().required(),
      }),
    }),
    TasksModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, queueProvider],
})
export class TasksModule {}
