import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { usersProvider } from 'src/users/providers/users.provider';
import { AuthController } from './auth.controller';
import passportProviders from './providers/passport.providers';

@Module({
  imports: [PassportModule.register({ session: true }), SharedModule],
  providers: [...passportProviders, usersProvider],
  controllers: [AuthController],
})
export class AuthModule {}
