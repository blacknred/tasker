import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'auth-service' },
    // bufferLogs: true,
  });

  app.enableShutdownHooks();
  await app.listen();
}

bootstrap();
