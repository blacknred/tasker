import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePushNotificationDto {
  @IsNumber(null, { message: 'Must be an integer' })
  userId?: number;
  @IsNotEmpty({ message: 'No payload provided' })
  payload: any;
}
