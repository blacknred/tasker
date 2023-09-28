import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { SEARCH_SERVICE } from '../consts';

export function getSearchClientOptions(
  options?: ClientsProviderAsyncOptions,
): ClientsProviderAsyncOptions {
  return Object.assign(
    {
      name: SEARCH_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get('RABBITMQ_URL') as string],
          queue: 'search-entries',
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
