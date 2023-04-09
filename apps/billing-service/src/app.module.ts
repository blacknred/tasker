import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import { getOrmOptions, getRedisOptions } from '@taskapp/shared';
import * as Joi from 'joi';
import { RedisModule } from 'nestjs-redis';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    RedisModule.forRootAsync(getRedisOptions()),
    CoreModule,
    InvoicesModule,
  ],
})
export class AppModule {}
