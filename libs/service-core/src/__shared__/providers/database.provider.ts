import { LoadStrategy } from '@mikro-orm/core';
import { MikroOrmModuleAsyncOptions } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const databaseProvider: MikroOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    clientUrl: configService.get('POSTGRES_URL'),
    debug: configService.get('NODE_ENV') === 'development',
    autoLoadEntities: true,
    flushMode: 1,
    ensureIndexes: true,
    type: 'postgresql',
    loadStrategy: LoadStrategy.JOINED,
    // preferReadReplicas: true,
    // replicas: [
    //   { name: 'read-1', host: 'read_host_1', user: 'read_user' },
    //   { name: 'read-2', host: 'read_host_2' },
    // ],
  }),
};
