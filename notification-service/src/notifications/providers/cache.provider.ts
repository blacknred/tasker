import { ConfigService } from '@nestjs/config';
import { CACHE_SERVICE } from '../consts';
import * as Redis from 'redis';

export const cacheProvider = {
  provide: CACHE_SERVICE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    Redis.createClient({
      url: configService.get('REDIS_URL'),
    }),
};
