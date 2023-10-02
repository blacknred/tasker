import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Sprint } from './entities/sprint.entity';
import {
  SprintCreatedHandler,
  SprintDeletedHandler,
  SprintUpdatedHandler,
} from './events';
import { GetSprintHandler, GetSprintsHandler } from './queries';
import { SprintsController } from './sprints.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Sprint])],
  controllers: [SprintsController],
  providers: [
    SprintCreatedHandler,
    SprintUpdatedHandler,
    SprintDeletedHandler,
    GetSprintHandler,
    GetSprintsHandler,
  ],
})
export class SprintsModule {}
