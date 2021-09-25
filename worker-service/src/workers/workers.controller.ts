import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NewTaskDto } from './dto/new-task.dto';
import { WorkersService } from './workers.service';

@Controller()
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  @EventPattern('task')
  handleTask(@Payload() newTaskDto: NewTaskDto, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (this.workersService.hasIdle) {
      this.workersService.do(newTaskDto).then(this.workersService.notify);
      channel.ack(originalMsg);
    }
  }
}
