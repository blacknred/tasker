import { ConfigService } from '@nestjs/config';
import { ClientsProviderAsyncOptions, Transport } from '@nestjs/microservices';
import { REPORTS_SERVICE } from '../consts';

export function getReportsClientOptions(
  options?: ClientsProviderAsyncOptions,
): ClientsProviderAsyncOptions {
  return Object.assign(
    {
      name: REPORTS_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get('RABBITMQ_URL') as string],
          queue: 'metrics',
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
