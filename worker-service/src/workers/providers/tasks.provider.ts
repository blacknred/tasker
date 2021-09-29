import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TASK_SERVICE } from '../consts';

export const tasksProvider = {
  provide: TASK_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'task-service' },
    }),
};
