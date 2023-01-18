import { EventStoreModule } from '@juicycleff/nestjs-event-store';
import { Module } from '@nestjs/common';
import { CqrsModule as Cqrs } from '@nestjs/cqrs';

@Module({
  imports: [
    Cqrs,
    EventStoreModule.register({
      type: 'event-store',
      tcpEndpoint: 'fgfg',
      // {
      //   // host: 'localhost',
      //   // port: 1113,
      // },
      options: {
        defaultUserCredentials: {
          username: 'admin',
          password: 'changeit',
        },
      },
    }),
  ],
})
export class CqrsModule {}
