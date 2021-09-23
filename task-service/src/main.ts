import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from './tasks/pipes/validation.pipe';
import { TasksModule } from './tasks/tasks.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(TasksModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: 3000,
    },
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}

bootstrap();
