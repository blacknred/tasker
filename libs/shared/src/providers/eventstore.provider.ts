import { ConfigService } from '@nestjs/config';
import { EventStoreModuleAsyncOptions } from '@taskapp/eventstore';

export function getEventStoreOptions(
  options?: any,
): EventStoreModuleAsyncOptions {
  return {
    // imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { hostname, port, username, password } = new URL(
        configService.get('EVENTSTORE_URL'),
      );

      return Object.assign(
        {
          connectionSettings: {
            defaultUserCredentials: { username, password },
          },
          endpoint: { host: hostname, port: +port },
        },
        options,
      );
    },
  };
}
