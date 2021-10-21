import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import 'reflect-metadata';
import { AppModule } from './app.module';

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(AppModule);
  const configService = appCtx.get(ConfigService);

  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    // bufferLogs: true,
    transport: Transport.RMQ,
    options: {
      urls: [<string>configService.get('QUEUE_URL')],
      queue: 'tasks',
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });

  app.enableShutdownHooks();
  await app.listen();
  appCtx.close();
}

bootstrap();
