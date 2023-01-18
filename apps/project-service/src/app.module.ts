import * as Joi from '@hapi/joi';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CoreModule } from '@taskapp/service-core';
import { NOTIFICATION_SERVICE } from './projects/consts';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SERVICE_NAME: Joi.string().required(),
        NODE_ENV: Joi.string().required(),
        POSTGRES_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
      }),
    }),
    CoreModule,
    ProjectsModule,
  ],
  providers: [
    {
      provide: NOTIFICATION_SERVICE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get('RABBITMQ_URL')],
            queue: 'notifications',
            noAck: false,
            queueOptions: {
              durable: true,
            },
          },
        }),
    },
  ],
})
export class AppModule {}
