import {
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { NewConfirmationDto } from './dto/new-confirmation.dto';
import { NewMessageDto } from './dto/new-message.dto';
import { NewVerificationDto } from './dto/new-verification.dto';
import SmsService from './sms.service';

@Controller('sms')
@UseInterceptors(ClassSerializerInterceptor)
export default class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post('verify')
  async verify(@Payload() newVerificationDto: NewVerificationDto) {
    return this.smsService.verifyPhoneNumber(newVerificationDto);
  }

  @Post('confirm')
  async confirm(@Payload() newConfirmationDto: NewConfirmationDto) {
    return this.smsService.confirmPhoneNumber(newConfirmationDto);
  }

  @Post('message')
  async message(@Payload() newMessageDto: NewMessageDto) {
    return this.smsService.message(newMessageDto);
  }
}
