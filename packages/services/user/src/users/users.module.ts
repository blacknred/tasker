import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokensModule } from 'src/tokens/tokens.module';
import databaseProviders from './providers/database.provider';
import { workspacesProvider } from './providers/workspaces.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule, forwardRef(() => TokensModule)],
  controllers: [UsersController],
  providers: [UsersService, ...databaseProviders, workspacesProvider],
  exports: [UsersService],
})
export class UsersModule {}
