import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { WorkersModule } from './workers/workers.module';

async function bootstrap() {
  const app = await NestFactory.create(WorkersModule);
  const configService = app.get(ConfigService);

  await app.connectMicroservice<RmqOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [configService.get('QUEUE_URL') as string],
      queue: 'tasks',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
}

bootstrap();
