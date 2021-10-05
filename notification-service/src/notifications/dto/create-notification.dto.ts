import { IsEnum, IsNumber, IsString } from 'class-validator';
import { NotificationType } from '../interfaces/notification.interface';

export class CreateNotificationDto {
  @IsEnum(NotificationType, {
    message: `Must be one of ${Object.values(NotificationType)}`,
  })
  type: NotificationType;
  @IsString({ message: 'Must be a string' })
  payload: string;
  @IsNumber({}, { message: 'Must be an integer' })
  userId?: number;
}
