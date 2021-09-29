import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppService } from 'src/app.service';
import { usersProvider } from 'src/users/providers/users.provider';
import { AuthController } from './auth.controller';
import passportProviders from './providers/passport.providers';

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [...passportProviders, usersProvider, AppService],
  controllers: [AuthController],
})
export class AuthModule {}
