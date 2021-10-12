import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { SharedModule } from 'src/__shared__/shared.module';
import { usersProvider } from 'src/users/providers/users.provider';
import { AuthController } from './auth.controller';
import passportProviders from './providers/passport.providers';

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    PassportModule.register({ session: true }),
  ],
  providers: [...passportProviders, usersProvider],
  controllers: [AuthController],
})
export class AuthModule {}
