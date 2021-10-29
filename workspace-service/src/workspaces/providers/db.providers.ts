import { ConfigModule, ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';
import { DB_CONNECTION, WORKSPACE_REPOSITORY } from '../consts';
import { Workspace } from '../entities/workspace.entity';

export const ormProvider = {
  provide: DB_CONNECTION,
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    createConnection({
      entities: [Workspace],
      url: configService.get('DB_URL'),
      type: 'mongodb',
      logging: true,
      synchronize: true,
    }),
};

export const workspaceRepositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Workspace),
  provide: WORKSPACE_REPOSITORY,
  inject: [DB_CONNECTION],
};

export default [ormProvider, workspaceRepositoryProvider];
