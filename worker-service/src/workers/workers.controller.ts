import { Controller, Inject } from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  EventPattern,
  Payload,
  RmqContext
} from '@nestjs/microservices';
import { taskService } from './consts';
import { NewTaskDto } from './dto/new-task.dto';
import { WorkersService } from './workers.service';

@Controller()
export class WorkersController {
  constructor(
    private readonly workersService: WorkersService,
    @Inject(taskService) private readonly taskService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.taskService.connect();
  }

  notify(id: NewTaskDto['id']) {
    this.taskService.send('task_done', id);
  }

  @EventPattern('task')
  handleTask(@Payload() newTaskDto: NewTaskDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (this.workersService.hasIdle) {
      this.workersService.do(newTaskDto).then(this.notify);
      channel.ack(originalMsg);
    }
  }
}
