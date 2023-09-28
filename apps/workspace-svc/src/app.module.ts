import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/core';
import { getNotificationClientOptions, getOrmOptions } from '@taskapp/shared';
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
    WorkspaceModule,
  ],
})
export class AppModule {}
