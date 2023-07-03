import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import SmsService from './sms.service';

@Module({
  imports: [ConfigModule],
  exports: [SmsService],
  providers: [SmsService],
})
export class SmsModule {}
