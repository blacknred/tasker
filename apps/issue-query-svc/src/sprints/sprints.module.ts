import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { SprintsController } from './sprints.controller';
import { Sprint } from './entities/sprint.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Sprint])],
  controllers: [SprintsController],
  providers: [],
})
export class SprintsModule {}
