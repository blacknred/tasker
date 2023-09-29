import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Profile } from './entities/profile.entity';
import { User } from './roles/entities/role.entity';
import { UsersController } from './roles.controller';
import { UsersService } from './project.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class ProjectRolesModule {}
