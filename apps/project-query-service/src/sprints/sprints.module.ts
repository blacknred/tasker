import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Sprint } from '@taskapp/shared';
import { SprintsController } from './sprints.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Sprint])],
  controllers: [SprintsController],
  providers: [],
})
export class SprintsModule {}
