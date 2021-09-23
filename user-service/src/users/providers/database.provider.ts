import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';
import { createConnection } from 'typeorm';
import { DB_CONNECTION } from '../consts';

export const databaseProvider = {
  provide: DB_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    createConnection({
      entities: [path.join(__dirname, '../entities/*.entity.ts')],
      url: configService.get('DB_URL'),
      type: 'postgres',
      logging: true,
      synchronize: true,
      useUTC: true,
    }),
};
