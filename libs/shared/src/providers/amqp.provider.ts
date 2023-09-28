import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmqpAsyncOptionsInterface } from 'nestjs-amqp';

export function getAmqpOptions(
  options?: AmqpAsyncOptionsInterface,
): AmqpAsyncOptionsInterface {
  return Object.assign(
    {
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { hostname, port, username, password, protocol, pathname } =
          new URL(configService.get('RABBITMQ_URL'));

        return {
          name: pathname,
          hostname,
          port: +port,
          username,
          password,
          protocol,
        };
      },
    },
    options,
  );
}
