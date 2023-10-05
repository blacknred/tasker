import { bootstrap } from '@taskapp/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

bootstrap(AppModule, [
  {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'search-entries',
      noAck: false,
      persistent: true,
      prefetchCount: 100,
      isGlobalPrefetchCount: true,
      queueOptions: {
        durable: true,
      },
      // deserializer
    },
  },
]);
