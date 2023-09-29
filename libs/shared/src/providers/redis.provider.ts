import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModuleAsyncOptions, RedisModuleOptions } from 'nestjs-redis';

export function getRedisOptions(
  options?: RedisModuleOptions,
): RedisModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
      Object.assign(
        {
          url: configService.get('REDIS_URL'),
          showFriendlyErrorStack:
            configService.get('NODE_ENV') !== 'production',
          enableAutoPipelining: true,
        },
        options,
      ),
  };
}
