import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventStoreModuleAsyncOptions } from '@taskapp/eventstore';

export function getEventStoreOptions(
  options?: EventStoreModuleAsyncOptions,
): EventStoreModuleAsyncOptions {
  return Object.assign(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { hostname, port, username, password } = new URL(
          configService.get('EVENTSTORE_URL'),
        );

        return {
          connectionSettings: {
            defaultUserCredentials: { username, password },
          },
          endpoint: { host: hostname, port: +port },
        };
      },
    },
    options,
  );
}
