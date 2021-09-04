import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

export const cacheProvider = {
  provide: 'CACHE_SERVICE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: configService.get('REDIS_URL'),
      },
    }),
};
