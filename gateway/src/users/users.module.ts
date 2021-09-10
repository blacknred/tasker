import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { usersProvider } from './providers/users.provider';
import { cacheProvider } from './providers/cache.provider';
@Module({
  controllers: [UsersController],
  providers: [UsersService, usersProvider, cacheProvider],
})
export class UsersModule {}
