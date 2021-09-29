import { Module } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { usersProvider } from './providers/users.provider';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [AppService, usersProvider],
})
export class UsersModule {}
