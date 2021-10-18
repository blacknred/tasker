import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { API_PREFIX } from './__shared__/consts';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  const options = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The Tasker REST Full API')
    .setVersion('1.0')
    .addCookieAuth()
    .addTag('Auth')
    .addTag('Users')
    .addTag('Tasks')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(API_PREFIX, app, document);

  app.setGlobalPrefix(API_PREFIX);

  await app.listen(3000);
}

bootstrap();
