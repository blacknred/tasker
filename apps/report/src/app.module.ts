import * as Joi from '@hapi/joi';
import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ASL, CoreModule } from '@taskapp/service-core';
import { ISSUE_DB, SPRINT_DB } from './reports/consts';
import { ReportsModule } from './reports/reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        ISSUE_POSTGRES_URL: Joi.string().required(),
        SPRINT_POSTGRES_URL: Joi.string().required(),
      }),
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        contextName: ISSUE_DB,
        clientUrl: configService.get('ISSUE_POSTGRES_URL'),
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
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        contextName: SPRINT_DB,
        clientUrl: configService.get('SPRINT_POSTGRES_URL'),
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
    ReportsModule,
  ],
})
export class AppModule {}
