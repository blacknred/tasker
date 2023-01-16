import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisModule as Redis } from 'nestjs-redis';

@Module({
  imports: [
    Redis.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        url: configService.get('REDIS_URL'),
        showFriendlyErrorStack: configService.get('NODE_ENV') !== 'production',
        enableAutoPipelining: true,
      }),
    }),
  ],
})
export class RedisModule {}



RedisModule.forRootAsync(redisProvider),
AmqpModule.forRootAsync(queueProvider),
import { AmqpModule } from 'nestjs-amqp';
import { RedisModule } from 'nestjs-redis';

export const redisProvider: RedisModuleAsyncOptions = {
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const base = {
      url: configService.get('REDIS_URL'),
      showFriendlyErrorStack: configService.get('NODE_ENV') !== 'production',
      enableAutoPipelining: true,
    };
    return ['users', 'statuses'].map((name, db) => ({ ...base, name, db }));
  },
};

import { ConfigService } from '@nestjs/config';
import type { AmqpAsyncOptionsInterface } from 'nestjs-amqp';

export const queueProvider: AmqpAsyncOptionsInterface = {
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
};