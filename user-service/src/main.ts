import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from './users/pipes/validation.pipe';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AllExceptionFilter } from './users/filters/all-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'user-service' },
    // bufferLogs: true,
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllExceptionFilter());

  await app.listen();
}

bootstrap();
