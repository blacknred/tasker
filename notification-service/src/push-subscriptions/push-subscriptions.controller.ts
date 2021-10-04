import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePushSubscriptionDto } from './dto/create-push-subscription.dto';
import { DeletePushSubscriptionDto } from './dto/delete-push-subscription.dto';
import { GetPushSubscriptionsDto } from './dto/get-push-subscriptions.dto';
import { ResponseDto } from './dto/response.dto';
import { IPushSubscription } from './interfaces/push-subscription.interface';
import { PushSubscriptionsService } from './push-subscriptions.service';

@Controller('push-subscriptions')
export class PushSubscriptionsController {
  constructor(
    private readonly subscriptionsService: PushSubscriptionsService,
  ) {}

  @MessagePattern('create')
  create(
    @Payload() createSubscriptionDto: CreatePushSubscriptionDto,
  ): Promise<ResponseDto<IPushSubscription>> {
    return this.subscriptionsService.create(createSubscriptionDto);
  }

  @MessagePattern('getAll')
  getAll(
    @Payload() getSubscriptionsDto: GetPushSubscriptionsDto,
  ): Promise<ResponseDto<IPushSubscription[]>> {
    return this.subscriptionsService.findAll(getSubscriptionsDto);
  }

  @MessagePattern('delete')
  remove(
    @Payload() { userId }: DeletePushSubscriptionDto,
  ): Promise<ResponseDto<null>> {
    return this.subscriptionsService.remove(userId);
  }
}
