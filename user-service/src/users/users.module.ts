import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { cacheProvider } from './providers/cache.provider';
import databaseProviders from './providers/database.provider';
import { notificationsProvider } from './providers/notifications.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    ...databaseProviders,
    cacheProvider,
    notificationsProvider,
  ],
})
export class UsersModule {}
