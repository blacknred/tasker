import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { CreatePushSubscriptionDto } from './create-push-subscription.dto';
import { GetPushSubscriptionsDto } from './get-push-subscriptions.dto';
import { PushSubscription } from './entities/push-subscription.entity';

@Injectable()
export class PushSubscriptionsService {
  constructor(
    @InjectRepository(PushSubscription)
    private subscriptionsRepository: Repository<PushSubscription>,
  ) {}

  async create(createSubscriptionDto: CreatePushSubscriptionDto) {
    try {
      const subscriptionInUse = await this.subscriptionsRepository.findOne({
        endpoint: createSubscriptionDto.endpoint,
        userId: createSubscriptionDto.userId,
      });

      if (subscriptionInUse) {
        return {
          status: HttpStatus.CONFLICT,
          errors: [
            {
              message: 'Subscription already exists',
              field: 'endpoint',
            },
          ],
        };
      }

      const subscription = new PushSubscription();
      Object.assign(subscription, createSubscriptionDto);
      await this.subscriptionsRepository.save(subscription);

      return {
        status: HttpStatus.CREATED,
        data: subscription,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.message],
      });
    }
  }

  async findAll(getSubscriptionsDto: GetPushSubscriptionsDto) {
    const tasks = await this.subscriptionsRepository.find(getSubscriptionsDto);

    return {
      status: HttpStatus.OK,
      data: tasks,
    };
  }

  async findOne(id: ObjectID, userId: number) {
    const task = await this.subscriptionsRepository.findOne(id);

    if (!task) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        data: null,
      });
    }

    if (userId != null && task.userId !== userId) {
      throw new RpcException({
        status: HttpStatus.FORBIDDEN,
        data: null,
      });
    }

    return {
      status: HttpStatus.OK,
      data: task,
    };
  }

  async remove(userId: number) {
    try {
      await this.subscriptionsRepository.delete({ userId });

      return {
        status: HttpStatus.OK,
        data: null,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.message],
      });
    }
  }
}
