import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { repositoryProvider } from './providers/repository.provider';

@Module({
  imports: [ConfigModule],
  controllers: [RolesController],
  providers: [RolesService, repositoryProvider],
})
export class RolesModule {}
