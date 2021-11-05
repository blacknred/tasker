import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';
import { DB_CONNECTION, USER_REPOSITORY } from '../consts';
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

export const repositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(User),
  provide: USER_REPOSITORY,
  inject: [DB_CONNECTION],
};

export default [databaseProvider, repositoryProvider];
