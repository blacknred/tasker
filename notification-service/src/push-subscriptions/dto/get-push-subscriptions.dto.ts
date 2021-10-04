import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreatePushSubscriptionDto } from './create-push-subscription.dto';

export class GetPushSubscriptionsDto extends PartialType(
  PickType(CreatePushSubscriptionDto, ['userId', 'endpoint']),
) {}
