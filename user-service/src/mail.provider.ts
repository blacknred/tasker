import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory } from '@nestjs/microservices';

export const mailProvider = {
  provide: 'MAIL_SERVICE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) =>
    ClientProxyFactory.create({
      // transport: Transport.TCP,
      options: {
        url: configService.get('MAIL_SERVICE_URL'),
      },
    }),
};
