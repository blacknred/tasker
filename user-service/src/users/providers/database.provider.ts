import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';
import { createConnection } from 'typeorm';
import { databaseConnection } from '../consts';


export const databaseProvider = {
    provide: databaseConnection,
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => createConnection({
      entities: [path.join(__dirname, './*.entity.ts')],
        url: configService.get('DB_URL'),
        type: 'postgres',
        logging: true,
        synchronize: true,
        useUTC: true,
    }),
  };