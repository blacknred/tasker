import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Role } from 'src/roles/entities/role.entity';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { Agent } from './entities/agent.entity';

@Global()
@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Agent, Role])],
  controllers: [AgentsController],
  providers: [AgentsService],
  exports: [AgentsService],
})
export class AgentsModule {}
