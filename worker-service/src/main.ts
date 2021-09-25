import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { WorkersModule } from './workers/workers.module';

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(WorkersModule);
  const configService = appCtx.get(ConfigService);

  const app = await NestFactory.createMicroservice<RmqOptions>(WorkersModule, {
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

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
  appCtx.close();
}

bootstrap();
