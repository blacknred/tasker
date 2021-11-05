import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { Agent } from './entities/agent.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Agent])],
  controllers: [AgentsController],
  providers: [AgentsService],
})
export class AgentsModule {}
