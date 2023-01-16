import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmqpModule } from 'nestjs-amqp';

@Module({
  imports: [
    AmqpModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { hostname, port, username, password, protocol } = new URL(
          configService.get('RABBITMQ_URL'),
        );

        return {
          // name: 'queue',
          hostname,
          port: +port,
          username,
          password,
          protocol,
        };
      },
    }),
  ],
})
export class QueueModule {}
