import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '../consts';

export const notificationsProvider = {
  provide: NOTIFICATION_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'notification-service',
      },
    }),
};
