import { Transport } from '@nestjs/microservices';
import { bootstrap } from '@taskapp/core';
import { AppModule } from './app.module';

bootstrap(AppModule, [
  {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'notifications',
      noAck: false,
      persistent: true,
      prefetchCount: 100,
      isGlobalPrefetchCount: true,
      queueOptions: {
        durable: true,
      },
      // deserializer: 'NotificationDeserializer',
    },
  },
]);
