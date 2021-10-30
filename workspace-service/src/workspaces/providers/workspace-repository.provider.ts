import { Connection } from 'typeorm';
import { DB_CONNECTION, WORKSPACE_REPOSITORY } from '../consts';
import { Workspace } from '../entities/workspace.entity';

export const workspaceRepositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Workspace),
  provide: WORKSPACE_REPOSITORY,
  inject: [DB_CONNECTION],
};
