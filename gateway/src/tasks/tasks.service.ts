import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { taskService } from './consts';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class TasksService {
  constructor(@Inject(taskService) private readonly taskService: ClientProxy) {}

  async feed<T>(pattern, args) {
    const { data, errors, status }: IResponse<T> = await firstValueFrom(
      this.taskService.send(pattern, args),
    );

    if (status !== HttpStatus.CREATED && status !== HttpStatus.OK) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }
}
