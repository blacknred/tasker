import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SprintsController } from './sprints.controller';
import { SprintsService } from './sprints.service';

@Global()
@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Sprint])],
  controllers: [SprintsController],
  providers: [SprintsService],
})
export class SprintsModule {}
