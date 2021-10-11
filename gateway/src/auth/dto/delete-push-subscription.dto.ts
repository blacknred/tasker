import { IsNumber } from 'class-validator';

export class DeletePushSubscriptionDto {
  @IsNumber(null, { message: 'Must be an integer' })
  userId?: number;
}
