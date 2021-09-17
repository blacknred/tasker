import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProvider } from './providers/users.provider';
@Module({
  controllers: [UsersController],
  providers: [UsersService, usersProvider],
})
export class UsersModule {}
