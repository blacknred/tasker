import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RolesModule {}
