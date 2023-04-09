import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Profile } from './entities/profile.entity';
import { User } from '../../../member-query-service/src/members/entities/member.entity';
import { UsersController } from './members.controller';
import { UsersService } from './teammates.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class ProjectMembersModule {}
