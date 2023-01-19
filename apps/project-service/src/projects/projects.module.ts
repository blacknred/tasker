import { EventStoreModule, EventStoreSubscriptionType } from '@juicycleff/nestjs-event-store';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { Project } from './entities/project.entity';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [
    CqrsModule,
    ConfigModule,
    MikroOrmModule.forFeature([Project]),
    EventStoreModule.registerFeature({
      type: 'event-store',
      featureStreamName: '$svc-project',
      subscriptions: [
        {
          type: EventStoreSubscriptionType.Persistent,
          streamName: '$et-user',
        },
      ],
      
      streamName: '$et-user',
      eventHandlers: {
        HeroKilledDragonEvent: ({ heroId, dragonId }) =>
          new HeroKilledDragonEvent(heroId, dragonId),
      },
    }),
  ],
  controllers: [ProjectsController],
})
export class ProjectsModule {}
