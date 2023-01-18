import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';
import { NewConfirmationDto } from './dto/new-confirmation.dto';
import { NewMessageDto } from './dto/new-message.dto';
import { NewVerificationDto } from './dto/new-verification.dto';

@Injectable()
export default class SmsService {
  private twilioClient: Twilio;
  private from: string;
  private serviceSid: string;

  constructor(private readonly configService: ConfigService) {
    this.from = this.configService.get('TWILIO_SENDER_PHONE_NUMBER');
    this.serviceSid = this.configService.get('TWILIO_VERIFICATION_SERVICE_SID');
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async verifyPhoneNumber({ to }: NewVerificationDto) {
    return this.twilioClient.verify
      .services(this.serviceSid)
      .verifications.create({ to, channel: 'sms' });
  }

  async confirmPhoneNumber(newConfirmationDto: NewConfirmationDto) {
    const result = await this.twilioClient.verify
      .services(this.serviceSid)
      .verificationChecks.create(newConfirmationDto);

    if (!result.valid || result.status !== 'approved') {
      return {
        status: HttpStatus.BAD_REQUEST,
        errors: [
          {
            field: 'code',
            message: 'Wrong code provided',
          },
        ],
      };
    }

    return {
      status: HttpStatus.OK,
      data: newConfirmationDto.to,
    };
  }

  async message(newMessageDto: NewMessageDto) {
    return this.twilioClient.messages.create({
      ...newMessageDto,
      from: this.from,
    });
  }
}
