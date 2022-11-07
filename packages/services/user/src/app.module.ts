import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {MicroserviceModule} from "@taskapp/microservice";
import * as S from "@taskapp/types";

// import { TokensModule } from './tokens/tokens.module';
// import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        SECRET: Joi.string().required(),
      }),
    }),
    // UsersModule,
    // TokensModule,
  ],
})
export class AppModule {}
