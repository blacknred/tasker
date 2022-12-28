import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule, providers } from '@taskapp/service-core';
import { AmqpModule } from 'nestjs-amqp';
import { SprintsModule } from './sprints/sprints.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    CoreModule,
    MikroOrmModule.forRootAsync(providers.database),
    AmqpModule.forRootAsync(providers.queueProvider),
    SprintsModule,
  ],
})
export class AppModule {}
