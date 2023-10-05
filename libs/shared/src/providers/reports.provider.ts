import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { REPORTS_SERVICE } from '../consts';

export function getReportsClientOptions(
  options?: ClientProvider,
): ClientsProviderAsyncOptions {
  return {
    name: REPORTS_SERVICE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: Object.assign(
        {
          urls: [configService.get('RABBITMQ_URL') as string],
          queue: 'metrics',
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
