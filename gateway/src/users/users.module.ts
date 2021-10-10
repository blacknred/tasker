import { Module } from '@nestjs/common';
import { SharedModule } from 'src/__shared__/shared.module';
import { usersProvider } from './providers/users.provider';
import { UsersController } from './users.controller';

@Module({
  imports: [SharedModule],
  controllers: [UsersController],
  providers: [usersProvider],
})
export class UsersModule {}
