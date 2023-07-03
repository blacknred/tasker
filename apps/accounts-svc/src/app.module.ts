import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { CoreModule } from '@taskapp/core';
import {
  getHttpOptions,
  getNotificationClientOptions,
  getOrmOptions,
  getRedisOptions,
} from '@taskapp/shared';
import * as Joi from 'joi';
import { RedisModule } from 'nestjs-redis';
import { AccountsModule } from './accounts/accounts.module';
import { FiltersModule } from './filters/filters.module';
import { InvitationsModule } from './invitations/invitations.module';
import { VerificationsModule } from './verifications/verifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        APP_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        SECRET: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync(getOrmOptions()),
    RedisModule.forRootAsync(getRedisOptions()),
    HttpModule.registerAsync(getHttpOptions()),
    ClientsModule.registerAsync([getNotificationClientOptions()]),
    CoreModule,
    AccountsModule,
    InvitationsModule,
    VerificationsModule,
    FiltersModule,
  ],
})
export class AppModule {}
