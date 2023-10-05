import { ConfigService } from '@nestjs/config';
import { AmqpAsyncOptionsInterface, AmqpOptionsInterface } from 'nestjs-amqp';

export function getAmqpOptions(
  options?: AmqpOptionsInterface,
): AmqpAsyncOptionsInterface {
  return {
    // imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { hostname, port, username, password, protocol, pathname } =
        new URL(configService.get('RABBITMQ_URL'));

      return Object.assign(
        {
          name: pathname,
          hostname,
          port: +port,
          username,
          password,
          protocol,
        },
        options,
      );
    },
  };
}
