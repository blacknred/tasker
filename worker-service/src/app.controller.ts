import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern, Payload, Ctx, RmqContext  } from '@nestjs/microservices';
import { WorkerService } from './worker.service';
import { ITask } from './interfaces/task.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: WorkerService,
    @Inject('TASK_SERVICE') private readonly taskService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.taskService.connect();
  }

  notify(id: ITask['id']) {
    this.taskService.send('task_done', id)
  }

  @EventPattern('task')
  handleTask(@Payload() task: ITask, @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    if (this.appService.hasIdle) {
      this.appService.do(task).then(this.notify);
      channel.ack(originalMsg)
    }
  }
}
