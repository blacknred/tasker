import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  // app.enableCors(); // dev

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
  SwaggerModule.setup('api/v1', app, document);

  await app.listen(3000);
}
bootstrap();
