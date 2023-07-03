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
      // deserializer: 'NotificationDeserializer',
      queueOptions: {
        durable: true,
      },
    },
  },
]);

// batching
// How about set consumer prefetch-count=1000. If a consumer's unack messages reach its prefetch limit, rabbitmq will not deliver any message to it.
// Don't ACK received message, until you have 1000 messages, then copy it to other list and preform your processing. When your job done,
// ACK the last message, and all message before this message will be ACK by rabbitmq server.
