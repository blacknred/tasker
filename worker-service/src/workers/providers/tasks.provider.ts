import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TASK_SERVICE } from '../consts';

export const tasksProvider = {
  provide: TASK_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    }),
};
