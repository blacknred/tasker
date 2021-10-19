import { NewTaskDto } from '../dto/new-task.dto';

export function mockTaskExecutor(task: NewTaskDto): any {
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
    console.log(777);
    if (n < 2) return n;
    return fibonacci(n - 2) + fibonacci(n - 1);
  }

  return fibonacci(duration);
}
