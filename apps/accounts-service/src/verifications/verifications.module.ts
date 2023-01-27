import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Account } from '../accounts/entities';
import { VerificationsController } from './verifications.controller';
import { VerificationsService } from './verifications.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Account])],
  controllers: [VerificationsController],
  providers: [VerificationsService],
})
export class VerificationsModule {}
