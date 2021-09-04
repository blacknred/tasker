import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const usersProvider = {
  provide: 'USERS_SERVICE',
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,
      },
    }),
};
