import { ConfigService } from '@nestjs/config';
import { CACHE_SERVICE } from '../consts';
import { RedisAdapter } from '../utils/redis.adapter';

export const cacheProvider = {
  provide: CACHE_SERVICE,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    new RedisAdapter({ url: configService.get('CACHE_URL') }),
};
