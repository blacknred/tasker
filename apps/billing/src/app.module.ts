import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // REDIS_URL: Joi.string().required(),
        // SECRET: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
