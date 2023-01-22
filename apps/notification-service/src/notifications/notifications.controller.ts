import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('create')
  async notify(
    @Payload() dto: CreateNotificationDto,
    @Ctx() context: RmqContext,
  ) {
    const {
      properties: { headers },
    } = context.getMessage();
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    // await this.notificationsService.create(dto);
  }
}
