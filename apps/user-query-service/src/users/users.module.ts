import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersController } from './users.controller';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([User])],
  controllers: [UsersController],
})
export class UsersModule {}
