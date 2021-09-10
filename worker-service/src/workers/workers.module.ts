import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { tasksProvider } from './providers/tasks.provider';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        QUEUE_URL: Joi.string().required(),
      }),
    }),
  ],
  controllers: [WorkersController],
  providers: [WorkersService, tasksProvider],
})
export class WorkersModule {}
