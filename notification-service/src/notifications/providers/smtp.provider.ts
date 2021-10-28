import { ConfigService } from '@nestjs/config';
import { EMAIL_FROM } from '../consts';

export const smtpProvider = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    transport: configService.get('SMTP_URL'),
    defaults: {
      from: EMAIL_FROM,
    },
    logger: true,
    debug: false,
  }),
};
