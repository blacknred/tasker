import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { WORKSPACE_SERVICE } from '../consts';

export const tasksProvider = {
  provide: WORKSPACE_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'task-service',
      },
    }),
};
