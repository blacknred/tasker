import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { ITask } from './interfaces/task.interface';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('ROCKET_SERVICE') private readonly taskService: ClientProxy,
  ) {}

  // will delay bootstrapping
  async onApplicationBootstrap() {
    await this.taskService.connect();
  }

  notify(task: ITask) {
    this.taskService.send('task_patch', task)
  }

  @EventPattern('task')
  handleTask(task: ITask) {
    this.appService.schedule(task).then(this.notify);
  }
}
