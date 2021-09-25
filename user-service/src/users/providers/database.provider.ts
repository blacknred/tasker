import { ConfigModule, ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import { DB_CONNECTION } from '../consts';
import { User } from '../entities/user.entity';

export const databaseProvider = {
  provide: DB_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    createConnection({
      entities: [User],
      url: configService.get('DB_URL'),
      type: 'postgres',
      logging: true,
      synchronize: true,
      useUTC: true,
    }),
};
