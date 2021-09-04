import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { cacheProvider } from './cache.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';


@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        REDIS_URL: Joi.string().required()
      }),
    }),
    DatabaseModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, cacheProvider]
})
export class UsersModule {}


