import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { Agent } from './entities/agent.entity';
import { usersProvider } from './providers/users.provider';

@Global()
@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Agent])],
  controllers: [AgentsController],
  providers: [AgentsService, usersProvider],
  exports: [AgentsService],
})
export class AgentsModule {}
