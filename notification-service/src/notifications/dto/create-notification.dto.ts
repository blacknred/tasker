import { IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNumber({}, { message: 'Must be an integer' })
  userId?: number;
  @IsString({ message: 'Must be a string' })
  payload: string;
}
