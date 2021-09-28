import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const appCtx = await NestFactory.createApplicationContext(AppModule);
  const configService = appCtx.get(ConfigService);

  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
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
