import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        QUEUE_URL: Joi.string().required(),
      }),
    }),
    TasksModule,
  ],
})
export class AppModule {}
