import { IsNumber, IsString, ValidateNested } from 'class-validator';

class PushSubscriptionKeysDto {
  @IsString({ message: 'Must be a string' })
  auth: string;
  @IsString({ message: 'Must be a string' })
  p256dh: string;
}

export class CreatePushSubscriptionDto {
  @IsNumber({}, { message: 'Must be an integer' })
  userId: number;
  @IsString({ message: 'Must be a string' })
  endpoint: string;
  @IsNumber({}, { message: 'Must be an integer' })
  expirationTime?: number;
  @ValidateNested()
  keys: PushSubscriptionKeysDto;
}
