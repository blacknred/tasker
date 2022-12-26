import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule, providers } from '@taskapp/service-core';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        SECRET: Joi.string().required(),
      }),
    }),
    CoreModule,
    MikroOrmModule.forRootAsync(providers.database),
    UsersModule,
  ],
})
export class AppModule {}
