import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokensService } from 'src/tokens/tokens.service';
import databaseProviders from './providers/database.provider';
import { workspacesProvider } from './providers/workspaces.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule, TokensService],
  controllers: [UsersController],
  providers: [UsersService, ...databaseProviders, workspacesProvider],
  exports: [UsersService],
})
export class UsersModule {}
