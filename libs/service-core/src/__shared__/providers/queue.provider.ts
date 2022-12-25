import { ConfigService } from '@nestjs/config';
import type { AmqpAsyncOptionsInterface } from 'nestjs-amqp';

export const queueProvider: AmqpAsyncOptionsInterface = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const { hostname, port, username, password, protocol } = new URL(
      configService.get('RABBITMQ_URL'),
    );

    return {
      hostname,
      port: +port,
      username,
      password,
      protocol,
    };
  },
};
