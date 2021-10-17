import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NewNotificationDto } from './dto/new-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify')
  async notify(@Payload() notificationDto: NewNotificationDto) {
    await this.notificationsService.notify(notificationDto);
  }
}
