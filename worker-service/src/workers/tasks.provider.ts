import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { taskService } from './consts';

export const tasksProvider = {
  provide: taskService,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    }),
};
