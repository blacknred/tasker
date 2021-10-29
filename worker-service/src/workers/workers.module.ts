import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { workspacesProvider } from './providers/workspaces.provider';
import { WorkersController } from './workers.controller';
import { WorkersService } from './workers.service';

@Module({
  imports: [ConfigModule],
  controllers: [WorkersController],
  providers: [WorkersService, workspacesProvider],
})
export class WorkersModule {}
