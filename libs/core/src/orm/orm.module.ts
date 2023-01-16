import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AsyncLocalStorage } from 'node:async_hooks';

const ALS = new AsyncLocalStorage<any>();

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        clientUrl: configService.get('POSTGRES_URL'),
        debug: configService.get('NODE_ENV') === 'development',
        loadStrategy: LoadStrategy.JOINED,
        context: () => ALS.getStore(), // use our AsyncLocalStorage instance
        registerRequestContext: false, // disable automatatic middleware
        autoLoadEntities: true,
        ensureIndexes: true,
        type: 'postgresql',
        flushMode: 1,
        // preferReadReplicas: true,
        // replicas: [
        //   { name: 'read-1', host: 'read_host_1', user: 'read_user' },
        //   { name: 'read-2', host: 'read_host_2' },
        // ],
      }),
    }),
  ],
})
export class OrmModule {}
