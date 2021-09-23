import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class BaseService {
  constructor(private readonly service: ClientProxy) {}

  async feed<T>(pattern, args) {
    const { data, errors, status }: IResponse<T> = await firstValueFrom(
      this.service.send(pattern, args),
    );

    if (status !== HttpStatus.CREATED && status !== HttpStatus.OK) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }
}
