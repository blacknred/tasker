import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { CoreModule } from '@taskapp/core';
import {
  getHttpOptions,
  getNotificationClientOptions,
  getSearchClientOptions,
} from '@taskapp/shared';
import * as Joi from 'joi';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().required(),
        SERVICE_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        SECRET: Joi.string().required(),
        HTTP_TIMEOUT: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    HttpModule.registerAsync(getHttpOptions()),
    ClientsModule.registerAsync([getNotificationClientOptions()]),
    ClientsModule.registerAsync([getSearchClientOptions()]),
    CoreModule,
    WorkspacesModule,
  ],
})
export class AppModule {}
