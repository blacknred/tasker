import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { cacheProvider } from './providers/cache.provider';
import { LocalStrategy } from './providers/local-strategy.provider';
import { AuthSerializer } from './providers/session-serializer.provider';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, cacheProvider, LocalStrategy, AuthSerializer],
})
export class AuthModule {}
@Request() req