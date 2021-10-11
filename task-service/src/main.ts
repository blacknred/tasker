import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from './tasks/pipes/validation.pipe';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { ErrorFilter } from './tasks/filters/exception.filter';
import { TimeoutInterceptor } from './tasks/interceptors/timeout.interceptors';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    bufferLogs: true,
    transport: Transport.TCP,
    options: { host: 'task-service' },
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new ErrorFilter());
  app.useGlobalInterceptors(new TimeoutInterceptor());

  await app.listen();
}

bootstrap();
