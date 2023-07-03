import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import { getHttpOptions, getRedisOptions } from '@taskapp/shared';
import * as Joi from 'joi';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        SECRET: Joi.string().required(),
        HTTP_TIMEOUT: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        AUTH_ACCESS_TOKEN_LIFESPAN: Joi.string().required(),
        AUTH_REFRESH_TOKEN_LIFESPAN: Joi.string().required(),
      }),
    }),
    CoreModule,
    RedisModule.forRootAsync(getRedisOptions()),
    HttpModule.registerAsync(getHttpOptions()),
    CoreModule,
    AuthModule,
  ],
})
export class AppModule {}
