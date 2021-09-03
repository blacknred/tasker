import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { cacheProvider } from './cache.provider';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required()
      }),
    })
  ],
  controllers: [],
  providers: [cacheProvider],
})
export class AppModule {}
