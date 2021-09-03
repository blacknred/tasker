import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITask } from './interfaces/task.interface';
import createWorkerpool from "./pool";

@Injectable()
export class AppService {
  private pool;
  private configService;

  constructor() {
    this.configService = new ConfigService();
    this.pool = createWorkerpool({ workers: this.configService.get('WORKERS_QNT') });
  }

  mockOperation(n: number): any {
    const fibonacci = (n) => (n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1));
    return fibonacci(n);
  }

  schedule(task: ITask): Promise<ITask> {
    let duration = 0;
    switch (task.type) {
      case 'LONG': duration = 70; break;
      case 'MEDIUM': duration = 50; break;
      case 'SHORT': duration = 30; break;
      default: 
    }

    return this.pool.createTask(this.mockOperation).runAsync(duration);
  }
}
