import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Sprint } from 'apps/issue-command-service/src/sprints/entities/sprint.entity';
import { SprintsController } from './sprints.controller';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Sprint])],
  controllers: [SprintsController],
})
export class SprintsModule {}
