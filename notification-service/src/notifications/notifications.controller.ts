import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { INotification } from './interfaces/notification.interface';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('push')
  async push(@Payload() createNotificationDto: CreateNotificationDto) {
    await this.notificationsService.push(createNotificationDto);
  }

  @EventPattern('email')
  async email(@Payload() createNotificationDto: CreateNotificationDto) {
    await this.notificationsService.email(createNotificationDto);
  }

  @EventPattern('sms')
  async sms(@Payload() createNotificationDto: CreateNotificationDto) {
    await this.notificationsService.sms(createNotificationDto);
  }

  @EventPattern('consume')
  async consume(@Payload() notification: INotification) {
    await this.notificationsService.consume(notification);
  }
}
