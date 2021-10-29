import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { cacheProvider } from './providers/cache.provider';
import passportProviders from './providers/passport.providers';
import { userProvider } from './providers/user.provider';

@Module({
  imports: [ConfigModule, PassportModule.register({ session: true })],
  providers: [AuthService, cacheProvider, userProvider, ...passportProviders],
  controllers: [AuthController],
})
export class AuthModule {}
