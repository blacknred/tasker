import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workspace } from './entities/workspace.entity';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Workspace])],
  controllers: [WorkspacesController],
  providers: [WorkspacesService],
})
export class WorkspacesModule {}
