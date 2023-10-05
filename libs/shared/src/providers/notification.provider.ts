import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '../consts';

export function getNotificationClientOptions(
  options?: ClientProvider,
): ClientsProviderAsyncOptions {
  return {
    name: NOTIFICATION_SERVICE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: Object.assign(
        {
          urls: [configService.get('RABBITMQ_URL') as string],
          queue: 'notifications',
          persistent: true,
          queueOptions: {
            durable: true,
          },
        },
        options,
      ),
    }),
  };
}
