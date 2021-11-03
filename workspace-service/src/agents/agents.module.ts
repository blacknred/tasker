import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgentsController } from './agents.controller';
import { AgentsService } from './agents.service';
import { repositoryProvider } from './providers/repository.provider';

@Module({
  imports: [ConfigModule],
  controllers: [AgentsController],
  providers: [AgentsService, repositoryProvider],
})
export class AgentsModule {}
