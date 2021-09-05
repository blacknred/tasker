import { parentPort, threadId } from "worker_threads";

parentPort.on("message", (msg) => {
  const { id, task, data } = msg;
  console.log(`running task ${id} on thread ${threadId}`);
  // to run our function we will have to first turn it into named function
  const func = "(function run" + task.slice("function".length) + ")";
  parentPort.postMessage({ id, result: eval(func)() });
});
