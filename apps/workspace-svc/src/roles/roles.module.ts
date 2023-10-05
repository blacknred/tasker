import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RolesService } from './roles.service';

@Module({
  imports: [ConfigModule],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
