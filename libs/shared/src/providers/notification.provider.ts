import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '../consts';

export function getNotificationClientOptions(
  options?: ClientsProviderAsyncOptions,
): ClientsProviderAsyncOptions {
  return Object.assign(
    {
      name: NOTIFICATION_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get('RABBITMQ_URL') as string],
          queue: 'notifications',
          noAck: false,
          queueOptions: {
            durable: true,
          },
        },
      }),
    },
    options,
  );
}
