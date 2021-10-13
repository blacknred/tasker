import { ConfigModule, ConfigService } from '@nestjs/config';
import { createConnection } from 'typeorm';
import { DB_CONNECTION } from '../consts';
import { Task } from '../entities/task.entity';

export const dbProvider = {
  provide: DB_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    createConnection({
      entities: [Task],
      url: configService.get('DB_URL'),
      type: 'mongodb',
      logging: true,
      synchronize: true,
    }),
};
