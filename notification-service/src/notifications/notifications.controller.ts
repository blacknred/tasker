import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotificationDto } from './dto/notification.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify')
  async notify(@Payload() notificationDto: NotificationDto) {
    await this.notificationsService.notify(notificationDto);
  }
}
