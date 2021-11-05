import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseProviders from './providers/database.provider';
import { notificationsProvider } from './providers/notifications.provider';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, ...databaseProviders, notificationsProvider],
})
export class UsersModule {}
