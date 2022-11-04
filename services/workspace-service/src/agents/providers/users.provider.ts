import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '../consts';

export const usersProvider = {
  provide: USER_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host: 'user-service' },
    }),
};
