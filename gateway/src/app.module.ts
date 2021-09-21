import * as Joi from '@hapi/joi';
import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
//
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisClient } from 'redis';
import { cacheService } from './auth/consts';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        REDIS_URL: Joi.string().required(),
        SECRET: Joi.string().required(),
      }),
    }),
    TasksModule,
    UsersModule,
    AuthModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(cacheService) private readonly redis: RedisClient,
    private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret: this.configService.get('SECRET'),
          resave: false,
          cookie: {
            sameSite: 'lax',
            httpOnly: true,
            maxAge: 86400000,
            // signed: false, // unsecure
            // secure: true,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
