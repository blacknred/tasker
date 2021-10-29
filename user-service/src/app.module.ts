import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseProvider } from './users/providers/database.provider';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
        QUEUE_URL: Joi.string().required(),
        SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(databaseProvider),
    UsersModule,
  ],
})
export class AppModule {}
