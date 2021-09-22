import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { cacheProvider } from './providers/cache.provider';
import passportProviders from './providers/passport.provider';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [UsersService, cacheProvider, ...passportProviders],
})
export class AuthModule {}
