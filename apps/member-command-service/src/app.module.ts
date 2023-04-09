import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import { getOrmOptions } from '@taskapp/shared';
import * as Joi from 'joi';
import { UsersModule } from './users/users.module';
// import { AmqpModule } from 'nestjs-amqp';
// import { RedisModule } from 'nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        EVENTSTORE_URL: Joi.string().required(),
        SECRET: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    // RedisModule.forRootAsync(getRedisOptions()),
    // AmqpModule.forRootAsync(getAmqpOptions()),
    CoreModule,
    UsersModule,
  ],
})
export class AppModule {}
