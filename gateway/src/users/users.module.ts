import { Module } from '@nestjs/common';
import { usersProvider } from './providers/users.provider';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [usersProvider],
})
export class UsersModule {}
