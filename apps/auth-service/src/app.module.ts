import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule, providers } from '@taskapp/service-core';
import { RedisModule } from 'nestjs-redis';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        SECRET: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        AUTH_ACCESS_TOKEN_LIFESPAN: Joi.string().required(),
        AUTH_REFRESH_TOKEN_LIFESPAN: Joi.string().required(),
      }),
    }),
    CoreModule,
    RedisModule.forRootAsync(providers.redisProvider),
    AuthModule,
  ],
})
export class AppModule {}
