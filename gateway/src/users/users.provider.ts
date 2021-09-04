import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { userService } from './consts';

export const usersProvider = {
  provide: userService,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '0.0.0.0',
        port: 3001,
      },
    }),
};
