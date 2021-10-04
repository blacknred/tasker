import { Test, TestingModule } from '@nestjs/testing';
import { PushSubscriptionsService } from './push-subscriptions.service';

describe('TasksService', () => {
  let service: PushSubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PushSubscriptionsService],
    }).compile();

    service = module.get<PushSubscriptionsService>(PushSubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
