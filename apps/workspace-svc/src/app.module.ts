import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import { getNotificationClientOptions, getOrmOptions, getSearchClientOptions } from '@taskapp/shared';
import * as Joi from 'joi';
import { WorkspaceModule } from './workspaces/workspace.module';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        SECRET: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    CoreModule,
    MikroOrmModule.forRootAsync(getOrmOptions()),
    ClientsModule.registerAsync([getNotificationClientOptions()]),
    ClientsModule.registerAsync([getSearchClientOptions()]),
    WorkspaceModule,
  ],
})
export class AppModule {}

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
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        SECRET: Joi.string().required(),
        HTTP_TIMEOUT: Joi.string().required(),
      }),
    }),
    HttpModule.registerAsync(getHttpOptions()),
    ClientsModule.registerAsync([getNotificationClientOptions()]),
    ClientsModule.registerAsync([getSearchClientOptions()]),
    CoreModule,
    // AccountsModule,
    // InvitationsModule,
    // VerificationsModule,
    // FiltersModule,
  ],
})
export class AppModule {}