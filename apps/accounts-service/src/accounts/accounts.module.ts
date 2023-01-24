import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { Account } from './entities';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Account])],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class UsersModule {}
