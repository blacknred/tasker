import { Module } from '@nestjs/common';
import { userProvider } from './providers/user.provider';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [userProvider],
})
export class UsersModule {}
