import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const tasksProvider = {
  provide: 'TASKS_SERVICE',
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3002,
      },
    }),
};
