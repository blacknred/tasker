import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { TaskDto } from './dto/task.dto';
import { WorkersService } from './workers.service';

@Controller()
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @EventPattern('task')
  task(@Payload() newTaskDto: TaskDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (this.workersService.hasIdle) {
      this.workersService.do(newTaskDto).then(this.workersService.notify);
      channel.ack(originalMsg);
    }
  }
}
