import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Profile } from './entities/profile.entity';
import { User } from './entities/project-member.entity';
import { UsersController } from './project-members.controller';
import { UsersService } from './teammates.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class ProjectMembersModule {}
