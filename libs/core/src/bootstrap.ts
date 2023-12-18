import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@taskapp/shared';
import { json, urlencoded } from 'express';
import { Logger } from 'nestjs-pino';
import 'reflect-metadata';

export async function bootstrap(
  appModule: any,
  microservices: MicroserviceOptions[] = [],
) {
  // init app
  const app = await NestFactory.create(appModule, { bufferLogs: true });
  const logger = app.get(Logger);
  const config = app.get(ConfigService);
  const isProd = config.get('NODE_ENV') === 'production';

  // init microservices
  for (const config of microservices) {
    app.connectMicroservice<MicroserviceOptions>(config, {
      inheritAppConfig: true,
    });
  }

  // middleware
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));
  // app.use(cookieParser);

  // openapi
  if (!isProd) {
    const name = config.get('SERVICE_NAME');
    const version = config.get('API_VERSION');

    const options = new DocumentBuilder()
      .setTitle(`${name} API`)
      .setDescription(`The ${name} REST Full API`)
      .addBasicAuth()
      .addBearerAuth()
      .setVersion(version)
      .addTag(name)
      .build();

    try {
      const document = SwaggerModule.createDocument(app, options, {});
      SwaggerModule.setup('swagger-ui', app, document);
    } catch (err) {
      logger.error({ err });
    }
  }

  // sigkill, sigterm, uncaughtException, unhandledRejection
  app.enableShutdownHooks();
  process
    .on('uncaughtException', (err: Error) => {
      logger.error({ err });
      process.exit(1);
    })
    .on('unhandledRejection', (reason, promise) => {
      logger.error(`Unhandled Promise Rejection, reason: ${reason}`);
      promise.catch((err: Error) => {
        logger.error({ err });
        process.exit(1);
      });
    });

  // start
  await app.startAllMicroservices();
  await app.listen(3000);
}
