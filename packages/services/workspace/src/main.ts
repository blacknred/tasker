// import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
// import { AllExceptionFilter } from './__shared__/filters/all-exception.filter';
// import { ValidationPipe } from './__shared__/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'workspace-service' },
    // bufferLogs: true,
  });

  // app.useGlobalPipes(new ValidationPipe());
  // app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  // app.useGlobalFilters(new AllExceptionFilter());

  app.enableShutdownHooks();
  await app.listen();
}

bootstrap();
