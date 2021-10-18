import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { NewTaskDto } from './dto/new-task.dto';
import { WorkersService } from './workers.service';

@Controller()
export class WorkersController {
  constructor(private readonly workersService: WorkersService) {}

  // @EventPattern('new-task')
  // task(@Payload() newTaskDto: NewTaskDto, @Ctx() context: RmqContext) {
  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();
  //   console.log(444, this.workersService.hasIdle);

  //   if (this.workersService.hasIdle) {
  //     this.workersService.do(newTaskDto).then(this.workersService.notify);
  //     channel.ack(originalMsg);
  //   }
  // }
  @EventPattern('task_ack')
  task(newTaskDto: NewTaskDto) {
    // const channel = context.getChannelRef();
    // const originalMsg = context.getMessage();
    console.log(444, newTaskDto, this.workersService.hasIdle);
    return true;
    // if (this.workersService.hasIdle) {
    //   this.workersService.do(newTaskDto).then(this.workersService.notify);
    //   channel.ack(originalMsg);
    // }
  }
}
