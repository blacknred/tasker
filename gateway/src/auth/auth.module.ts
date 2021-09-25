import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import passportProviders from './providers/passport.providers';

@Module({
  imports: [PassportModule.register({ session: true }), UsersModule],
  providers: [...passportProviders],
  controllers: [AuthController],
})
export class AuthModule {}
