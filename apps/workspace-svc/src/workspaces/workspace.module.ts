import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './workspace.controller';
import { AuthService } from './workspace.service';
import {
  JwtTfaStrategy,
  JwtRefreshTokenStrategy,
  JwtStrategy,
  LocalStrategy,
} from './providers';

@Module({
  imports: [ConfigModule, PassportModule, JwtModule.register({})],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    JwtTfaStrategy,
    JwtRefreshTokenStrategy,
  ],
  controllers: [AuthController],
})
export class WorkspaceModule {}
