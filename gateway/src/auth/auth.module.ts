import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { cacheProvider } from './providers/cache.provider';
import { usersProvider } from './providers/users.provider';

@Module({
  controllers: [AuthController],
  providers: [AuthService, usersProvider, cacheProvider],
})
export class AuthModule {}
