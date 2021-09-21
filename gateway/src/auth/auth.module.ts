import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { cacheProvider } from './providers/cache.provider';
import passportProviders from './providers/passport.provider';

@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, cacheProvider, ...passportProviders],
})
export class AuthModule {}
