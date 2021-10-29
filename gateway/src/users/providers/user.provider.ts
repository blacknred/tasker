import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '../consts';

export const userProvider = {
  provide: USER_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'user-service',
      },
    }),
};
