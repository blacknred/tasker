import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { usersProvider } from 'src/users/providers/users.provider';
import { AuthController } from './auth.controller';
import passportProviders from './providers/passport.providers';

@Module({
  imports: [ConfigModule, PassportModule.register({ session: true })],
  providers: [usersProvider, ...passportProviders],
  controllers: [AuthController],
})
export class AuthModule {}
