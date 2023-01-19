import { ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'express';
import fs from 'fs';
import { Logger } from 'nestjs-pino';
import path from 'path';
import 'reflect-metadata';
import { ValidationPipe } from '@taskapp/shared';

export async function bootstrap(
  appModule: any,
  microservices: MicroserviceOptions[] = [],
) {
  // init app
  const app = await NestFactory.create(appModule, { bufferLogs: true });
  const logger = app.get(Logger);
  const config = app.get(ConfigService);

  // init microservices
  for (const config of microservices) {
    app.connectMicroservice<MicroserviceOptions>(config, {
      inheritAppConfig: true,
    });
  }

  // openapi
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
    const document = SwaggerModule.createDocument(app, options);
    fs.writeFileSync(
      path.resolve(__dirname, '../../../', 'swagger.json'),
      JSON.stringify(document),
    );
  } catch (err) {
    logger.error({ err });
  }

  // middleware
  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.use(cookieParser);
  app.use(json({ limit: '1mb' }));
  app.use(urlencoded({ extended: true, limit: '1mb' }));

  // start
  app.enableShutdownHooks();
  await app.startAllMicroservices();
  await app.listen(3000);

  process.on('uncaughtException', (err: Error) => {
    logger.error({ err });
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

// issue(pid) -> Member(pid,uid)(user) -> (read)[User,Sprint]
// sprint(pid) -> Member(pid,uid)(user) -> (read)User
// [favorite,watchlist](pid) -> (create)Member(pid,uid)(role) -> (read)[User,Project]
// report(pid) -> Member(pid,uid)(user) -> [User,Sprint]

// search(uid,q) -> (uid)member.getAll(users) -> [MEMBER(pids,q),ISSUE(pids,q),SPRINT(pids,q)]

// firstValueFrom(this.httpService.post(url, data))

// @MessagePattern('time.us.*', Transport.NATS)
// getDate(@Payload() data: number[], @Ctx() context: NatsContext) {
//   console.log(`Subject: ${context.getSubject()}`); // e.g. "time.us.east"
//   return new Date().toLocaleTimeString(...);
// }
// @MessagePattern({ cmd: 'time.us' }, Transport.TCP)
// getTCPDate(@Payload() data: number[]) {
//   return new Date().toLocaleTimeString(...);
// }

// import { Observable } from 'rxjs';
// import { map, timeout } from 'rxjs/operators';
// .pipe(
//   // timeout
//   timeout(REQUEST_TIMEOUT),
//   // transform
//   map<ResponseDto<T>, any>(({ status, ...payload }) => {
//     // return zip(...reqs).pipe(map((resps) => ({ ...resps })));
//     if (status !== HttpStatus.OK && status !== HttpStatus.CREATED && status !== HttpStatus.NO_CONTENT) {
//       throw new HttpException(payload, status);
//     }

//     return {
//       ...payload,
//       meta: {
//         lat: Date.now() - startAt + 'ms',
//       },
//     };
//   }),
// );
// }

