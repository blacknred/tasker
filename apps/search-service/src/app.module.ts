import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from '@taskapp/service-core';
import { SearchModule } from './entries/search module';
import { AsyncLocalStorage } from 'node:async_hooks';

const ALS = new AsyncLocalStorage<any>();

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
      }),
    }),
    CoreModule,
    SearchModule,
  ],
})
export class AppModule {}
