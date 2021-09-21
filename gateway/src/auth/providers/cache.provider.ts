import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { cacheService } from '../../consts';

export const cacheProvider = {
  provide: cacheService,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      transport: Transport.REDIS,
      options: {
        url: configService.get('REDIS_URL'),
      },
    }),
};
