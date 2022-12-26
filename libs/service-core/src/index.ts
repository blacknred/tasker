import { ClassSerializerInterceptor } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import { Logger } from 'nestjs-pino';
import 'reflect-metadata';
import { ValidationPipe } from './__shared__/pipes/validation.pipe';

export { CoreModule } from './core/core.module';
export * from './core/shared';

export async function bootstrap(appModule: any, microservices: MicroserviceOptions[]) {
  const app = await NestFactory.create(appModule, { bufferLogs: true });

  const logger = app.get(Logger);
  
  for (let config of microservices) {
    app.connectMicroservice<MicroserviceOptions>(config, { inheritAppConfig: true });
  }

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.use(cookieParser);
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  app.useLogger(logger);
  app.enableShutdownHooks();

  await app.startAllMicroservices();
  await app.listen(3000);

  process.on('uncaughtException', (error: Error) => {
    logger.error({ err: error });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Promise Rejection, reason: ${reason}`);
    promise.catch((err: Error) => {
      logger.error({ err });
      process.exit(1);
    });
  });
}
 
// @MessagePattern('time.us.*', Transport.NATS)
// getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
//   console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
//   return new Date().toLocaleTimeString(...);
// }
// @MessagePattern({ cmd: 'time.us' }, Transport.TCP)
// getTCPDate(@Payload() data: number[]) {
//   return new Date().toLocaleTimeString(...);
// }