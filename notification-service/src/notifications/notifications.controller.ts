import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { INotification } from './interfaces/notification.interface';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('create')
  async push(@Payload() createNotificationDto: CreateNotificationDto) {
    await this.notificationsService.create(createNotificationDto);
  }

  @EventPattern('consume')
  async consume(@Payload() notification: INotification) {
    await this.notificationsService.consume(notification);
  }
}
