import { Test, TestingModule } from '@nestjs/testing';
import { PushSubscriptionsController } from './push-subscriptions.controller';

describe('PushSubscriptionsController', () => {
  let controller: PushSubscriptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushSubscriptionsController],
      providers: [],
    }).compile();

    controller = module.get<PushSubscriptionsController>(
      PushSubscriptionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
