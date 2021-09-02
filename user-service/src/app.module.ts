import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { mailProvider } from './mail.provider';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
        MAIL_SERVICE_URL: Joi.string().required(),
      }),
    })
  ],
  controllers: [],
  providers: [mailProvider],
})
export class AppModule {}
