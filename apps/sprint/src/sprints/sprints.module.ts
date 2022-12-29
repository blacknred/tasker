import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SprintsController } from './sprints.controller';
import { SprintsService } from './sprints.service';
import { Agent } from './entities/sprint.entity';
import { usersProvider } from './providers/users.provider';

@Global()
@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Agent])],
  controllers: [SprintsController],
  providers: [SprintsService, usersProvider],
})
export class SprintsModule {}
