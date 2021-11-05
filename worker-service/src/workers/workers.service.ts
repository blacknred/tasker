import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { Worker } from 'worker_threads';
import { WORKSPACE_SERVICE } from './consts';
import { BaseStage, NewTaskDto } from './dto/new-task.dto';
import { mockTaskExecutor } from './utils/mockTaskExecutor';

@Injectable()
export class WorkersService {
  private readonly logger = new Logger(WorkersService.name);
  private resolvers = new Map<string, (data: any) => void>();
  private workers: Map<number, Worker>;
  private idle: number[];

  constructor(
    private readonly configService: ConfigService,
    @Inject(WORKSPACE_SERVICE) private readonly workspaceService: ClientProxy,
  ) {
    const workersQnt = this.configService.get('WORKERS_QNT');

    this.workers = new Map(
      Array.from({ length: workersQnt }).map<[number, Worker]>(() => {
        const w = new Worker(__dirname + '/utils/worker.js');
        return [w.threadId, w];
      }),
    );

    // idle workers ids
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

  get hasIdle(): boolean {
    return this.idle.length !== 0;
  }

  get count(): number {
    return this.workers.size;
  }

  notify = (task: NewTaskDto) => {
    task.stage = BaseStage.DONE;
    this.workspaceService.send('tasks/update', task);
  };

  do(task: NewTaskDto): Promise<any> {
    if (!this.hasIdle) return;

    const p = new Promise((r) => this.resolvers.set(task.id, r));

    const workerId = this.idle.shift();
    this.workers.get(workerId).postMessage({
      fn: mockTaskExecutor.toString(),
      args: task,
      id: task.id,
    });

    return p;
  }
}
