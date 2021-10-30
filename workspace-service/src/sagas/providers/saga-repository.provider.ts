import { DB_CONNECTION } from 'src/__shared__/consts';
import { Connection } from 'typeorm';
import { SAGA_REPOSITORY } from '../consts';
import { Saga } from '../entities/saga.entity';

export const sagaRepositoryProvider = {
  useFactory: (connection: Connection) => connection.getRepository(Saga),
  provide: SAGA_REPOSITORY,
  inject: [DB_CONNECTION],
};
