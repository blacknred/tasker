import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModuleAsyncOptions } from 'nestjs-redis';

export function getRedisOptions(
  options?: RedisModuleAsyncOptions,
): RedisModuleAsyncOptions {
  return Object.assign(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('REDIS_URL'),
        showFriendlyErrorStack: configService.get('NODE_ENV') !== 'production',
        enableAutoPipelining: true,
      }),
    },
    options,
  );
}
