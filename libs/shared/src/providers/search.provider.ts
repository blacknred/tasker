import { TracingModule } from '@dollarsign/nestjs-jaeger-tracing';
import { ConfigService } from '@nestjs/config';
import {
  ClientProvider,
  ClientsProviderAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { SEARCH_SERVICE } from '../consts';

export function getSearchClientOptions(
  options?: ClientProvider,
): ClientsProviderAsyncOptions {
  return {
    name: SEARCH_SERVICE,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      transport: Transport.RMQ,
      options: Object.assign(
        {
          urls: [configService.get('RABBITMQ_URL') as string],
          queue: 'search-entries',
          persistent: true,
          queueOptions: {
            durable: true,
          },
          ...TracingModule.getParserOptions(),
        },
        options,
      ),
    }),
  };
}
