import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { CreatePushNotificationDto } from './dto/create-push-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('push')
  push(@Payload() createNotificationDto: CreatePushNotificationDto) {
    this.notificationsService.push(createNotificationDto);
  }

  @EventPattern('email')
  email(@Payload() createNotificationDto: CreatePushNotificationDto) {
    console.log(createNotificationDto);
  }

  @EventPattern('sms')
  sms(@Payload() createNotificationDto: CreatePushNotificationDto) {
    console.log(createNotificationDto);
  }

  // @EventPattern('consume')
  // consume(@Payload() newTaskDto: NewTaskDto, @Ctx() context: RmqContext) {
  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();

  //   if (this.workersService.hasIdle) {
  //     this.workersService.do(newTaskDto).then(this.workersService.notify);
  //     channel.ack(originalMsg);
  //   }
  // }
}
