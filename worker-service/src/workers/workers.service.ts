import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Worker } from 'worker_threads';
import { TASK_SERVICE } from './consts';
import { NewTaskDto } from './dto/new-task.dto';

@Injectable()
export class WorkersService {
  private workers: Map<number, Worker>;
  private resolvers = new Map<string, (data: any) => void>();
  private idle: number[];

  constructor(
    private readonly configService: ConfigService,
    @Inject(TASK_SERVICE) private readonly taskService: ClientProxy,
  ) {
    const workersQnt = this.configService.get('WORKERS_QNT');

    this.workers = new Map(
      Array.from({ length: workersQnt }).map<[number, Worker]>(() => {
        const w = new Worker(__dirname + '/utils/worker.js');
        return [w.threadId, w];
      }),
    );

    // idle workers idsˇ
    this.idle = Array.from(this.workers.keys());

    this.workers.forEach((w, i) => {
      // the workerpool receives the result and resolves the task
      w.on('message', ({ id, result }) => {
        // call the resolver function for the task
        this.resolvers.get(id)(result);
        this.resolvers.delete(id);
        // put the worker on the list of idle workers
        this.idle.push(i);
      });
    });
  }

  // async onApplicationBootstrap() {
  //   await this.taskService.connect();
  // }

  get hasIdle(): boolean {
    return this.idle.length !== 0;
  }

  mockOperation(task: NewTaskDto): () => any {
    let duration = 0;
    switch (task.type) {
      case 'LONG':
        duration = 70;
        break;
      case 'MEDIUM':
        duration = 50;
        break;
      case 'SHORT':
        duration = 30;
        break;
      default:
    }

    function fibonacci(n) {
      if (n < 2) return task;
      return fibonacci(n - 2) + fibonacci(n - 1);
    }

    return () => fibonacci(duration);
  }

  notify(task: NewTaskDto) {
    task.finishedAt = Date.now();
    this.taskService.send('updateTask', task);
  }

  do(task: NewTaskDto): Promise<any> {
    if (!this.hasIdle) return;

    const p = new Promise((r) => this.resolvers.set(task.id, r));

    const workerId = this.idle.shift();
    this.workers.get(workerId).postMessage({
      task: this.mockOperation(task).toString(),
      data: task,
      id: task.id,
    });

    return p;
  }
}
