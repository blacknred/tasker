import { EventStoreModule as ESModule } from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ESModule.registerAsync({
      type: 'event-store',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const { hostname: host, port } = new URL(
          configService.get('EVENTSTORE_URL'),
        );
        return {
          type: 'event-store',
          tcpEndpoint: { host, port: +port },
          options: {
            defaultUserCredentials: {
              username: configService.get('EVENTSTORE_USER'),
              password: configService.get('EVENTSTORE_PASSWORD'),
            },
          },
        };
      },
    }),
  ],
})
export class EventStoreModule {}
