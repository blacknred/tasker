import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import passportProviders from './providers/passport.providers';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({})],
  providers: [AuthService, ...passportProviders],
  controllers: [AuthController],
})
export class AuthModule {}
