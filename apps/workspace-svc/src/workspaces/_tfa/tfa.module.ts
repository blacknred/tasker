import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Account } from '../_accounts/entities';
import { TfaController } from './tfa.controller';
import { TfaService } from './tfa.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Account])],
  controllers: [TfaController],
  providers: [TfaService],
})
export class UsersModule {}
