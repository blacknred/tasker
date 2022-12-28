import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { WORKER_SERVICE } from '../consts';

export const workerProvider = {
  provide: WORKER_SERVICE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [configService.get('RABBITMQ_URL')],
        queue: 'tasks',
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    }),
};
