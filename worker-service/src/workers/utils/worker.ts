import { parentPort, threadId } from 'worker_threads';

parentPort.on('message', (msg) => {
  const { id, fn, args } = msg;
  console.log(`running task ${id} on thread ${threadId}`);
  // to run our function we will have to first turn it into named function
  const operation = '(function' + fn.slice('function'.length) + ')';
  eval(operation)(args);

  parentPort.postMessage({ id, result: args });
});
