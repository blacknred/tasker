import * as Joi from '@hapi/joi';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ASL, CoreModule } from '@taskapp/service-core';
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
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientUrl: configService.get('POSTGRES_URL'),
        debug: configService.get('NODE_ENV') === 'development',
        loadStrategy: LoadStrategy.JOINED,
        context: () => ASL.getStore(),
        registerRequestContext: false,
        autoLoadEntities: true,
        ensureIndexes: true,
        type: 'postgresql',
        flushMode: 1,
      }),
    }),
    CoreModule,
    UsersModule,
  ],
})
export class AppModule {}
