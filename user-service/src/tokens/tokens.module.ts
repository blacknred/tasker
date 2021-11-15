import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { cacheProvider } from './providers/cache.provider';
import { notificationsProvider } from './providers/notifications.provider';
import { TokensController } from './tokens.controller';
import { TokensService } from './tokens.service';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [TokensController],
  providers: [TokensService, cacheProvider, notificationsProvider],
  exports: [TokensService],
})
export class TokensModule {}
