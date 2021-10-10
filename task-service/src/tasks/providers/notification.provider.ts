import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '../consts';

export const workerProvider = {
  provide: NOTIFICATION_SERVICE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [configService.get('QUEUE_URL')],
        queue: 'notifications',
        noAck: true,
        queueOptions: {
          durable: true,
        },
      },
    }),
};
