import { Worker } from "worker_threads";

interface Task<I, O> {
  // will resolve when a worker is done executing the function
  runAsync(data: I): Promise<O>;
  // task chaining
  then<O2>(t: Task<O, O2>): Task<I, O2>;
}

interface WorkerPool {
  createTask<data, result>(f: (d: data) => result): Task<data, result>;
}

interface WorkerPoolOptions {
  workers: number;
}

/** Worker(thread) pool manager who accepts tasks and will assign them to an idle worker. */
const createWorkerpool = (options: WorkerPoolOptions): WorkerPool => {
  // a map of workers created a single time and be reused for all the tasks
  const workers = new Map(
    Array.from({ length: options.workers }).map<[number, Worker]>(() => {
      const w = new Worker("./worker.ts");
      return [w.threadId, w];
    })
  );

  // a arr of ids of the idle(free to accept an new task) workers
  const idle = Array.from(workers.keys());

  // a map with taskid and task own resolver(will be called when a worker has completed the task)
  const resolvers = new Map<number, (data: any) => void>();

  // the backlog with tasks that have been queued and will be executed ASAP.
  // Those tasks exist of an id, a function and the additional data to send to the worker.
  // All the data here is typed as any, type safety will be introduced in the Task interface
  let backlog: { id: number; task: (data: any) => void; data: any }[] = [];

  // a counter increments task identifiers
  let taskIdCounter = 0;

  // run the next tasks on the backlog if there is a worker ready
  const runNext = () => {
    // check if we have both a task and an idle worker
    if (backlog.length == 0 || idle.length == 0) return;
    // take the next task and idle worker
    const task = backlog.shift();
    const worker = idle.shift();
    console.log(`scheduling ${task.id} on ${worker}`);
    // build the message for the worker. Since we cannot send functions between workers turn it into a string
    const msg = { ...task, task: task.task.toString() };
    // send the task to the worker
    workers.get(worker).postMessage(msg);
    // call runNext again
    runNext();
  };

  workers.forEach((w, i) => {
    // the workerpool receives the result and resolves the task
    w.on("message", (data) => {
      const { id, result } = data;
      // call the resolver function for the task
      resolvers.get(+id)(result);
      resolvers.delete(+id);
      // put the worker on the list of idle workers
      idle.push(i);
      // call runNext so that the backlog will be processed and the new idle worker gets a task.
      runNext();
    });
  });

  return {
    createTask<I, O>(func): Task<I, O> {
      return {
        runAsync(param: I): Promise<O> {
          // create a new taskid
          taskIdCounter += 1;
          // add the task to the backlog
          backlog.push({ id: taskIdCounter, task: func, data: param });
          // create a Promise and add the resolver to the resolvers
          const p = new Promise<O>((r) => resolvers.set(taskIdCounter, r));
          // call runNext to set the system in motion
          runNext();
          // return a promise
          return p;
        },
        // chainig tasks
        then<O2>(t: Task<O, O2>): Task<I, O2> {
          return {
            ...this,
            runAsync: (d) => this.runAsync(d).then((a) => t.runAsync(a)),
          };
        },
      };
    },
  };
};

export default createWorkerpool;
