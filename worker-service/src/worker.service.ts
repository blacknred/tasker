import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ITask } from './interfaces/task.interface';
import { Worker } from 'worker_threads';

@Injectable()
export class WorkerService {
  private workers: Map<number, Worker>;
  private resolvers = new Map<number, (data: any) => void>();
  private idle: number[];

  constructor() {
    const configService = new ConfigService();
    const workersQnt = configService.get('WORKERS_QNT');

    this.workers = new Map(
      Array.from({ length: workersQnt }).map<[number, Worker]>(() => {
        const w = new Worker('./utils/worker');
        return [w.threadId, w];
      }),
    );

    // idle workers idsˇ
    this.idle = Array.from(this.workers.keys());

    this.workers.forEach((w, i) => {
      // the workerpool receives the result and resolves the task
      w.on('message', ({ id }) => {
        // call the resolver function for the task
        this.resolvers.get(+id)(id);
        this.resolvers.delete(+id);
        // put the worker on the list of idle workers
        this.idle.push(i);
      });
    });
  }

  get hasIdle(): boolean {
    return this.idle.length !== 0;
  }

  mockOperation(task: ITask): () => any {
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

    const fibonacci = (n) => (n < 2 ? n : fibonacci(n - 2) + fibonacci(n - 1));
    return () => fibonacci(duration);
  }

  do(task: ITask): Promise<any> {
    if (!this.hasIdle) return;

    const p = new Promise((r) => this.resolvers.set(task.id, r));

    const workerId = this.idle.shift();
    this.workers.get(workerId).postMessage({
      task: this.mockOperation(task).toString(),
      id: task.id,
    });

    return p;
  }
}
