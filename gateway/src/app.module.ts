import * as Joi from '@hapi/joi';
import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as helmet from 'helmet';
import * as passport from 'passport';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CACHE_SERVICE, SESSION_LIVESPAN } from './auth/consts';
import { cacheProvider } from './auth/providers/cache.provider';
import { RedisAdapter } from './auth/utils/redis.adapter';
import { MonitoringModule } from './monitoring/monitoring.module';
import { TasksModule } from './workspaces/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        CACHE_URL: Joi.string().required(),
        QUEUE_URL: Joi.string().required(),
        SECRET: Joi.string().required(),
        VAPID_PUBLIC_KEY: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        FRONTEND_HOST: Joi.string().required(),
      }),
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'documentation'),
      serveRoot: '/docs',
    }),
    UsersModule,
    AuthModule,
    TasksModule,
    MonitoringModule,
  ],
  providers: [Logger, cacheProvider],
})
export class AppModule implements NestModule {
  constructor(
    @Inject(CACHE_SERVICE) private readonly redisService: RedisAdapter,
    private readonly configService: ConfigService,
  ) {}

  configure(consumer: MiddlewareConsumer) {
    const isProd = this.configService.get('NODE_ENV') === 'production';
    const secret = this.configService.get('SECRET');

    consumer
      .apply(
        helmet(),
        session({
          store: new (RedisStore(session))({
            client: this.redisService,
            logErrors: true,
          }),
          saveUninitialized: false,
          secret,
          resave: false,
          cookie: {
            sameSite: 'lax',
            httpOnly: true,
            maxAge: SESSION_LIVESPAN,
            signed: isProd,
            secure: isProd,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
