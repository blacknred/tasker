import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ConfigModule.forRoot(), TasksModule, UsersModule],
})
export class AppModule {}
