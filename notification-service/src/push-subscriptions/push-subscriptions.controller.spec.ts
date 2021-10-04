import { Test, TestingModule } from '@nestjs/testing';
import { PushSubscriptionsController } from './push-subscriptions.controller';
import { PushSubscriptionsService } from './push-subscriptions.service';

describe('PushSubscriptionController', () => {
  let controller: PushSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushSubscriptionsController],
      providers: [PushSubscriptionsService],
    }).compile();

    controller = module.get<PushSubscriptionsController>(
      PushSubscriptionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
