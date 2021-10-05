import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/shared/shared.module';
import { usersProvider } from 'src/users/providers/users.provider';
import { AuthController } from './auth.controller';
import { notificationsProvider } from './providers/notifications.provider';
import passportProviders from './providers/passport.providers';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    ConfigModule,
    SharedModule,
  ],
  providers: [...passportProviders, usersProvider, notificationsProvider],
  controllers: [AuthController],
})
export class AuthModule {}
