import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthStrategy } from './passport.provider';

@Module({
  imports: [PassportModule],
  providers: [AuthStrategy],
})
export class AuthModule {}
