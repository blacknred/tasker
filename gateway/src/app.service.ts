import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { IResponse } from './shared/interfaces/response.interface';

@Injectable()
export class AppService {
  protected service: ClientProxy;

  // constructor(service) {
  //   this.service = service;
  // }

  // static use(service: ClientProxy) {
  // return new AppService(service);
  // }

  set servic(s: ClientProxy) {
    this.service = s;
  }

  async feed<T>(pattern: string, args: unknown) {
    console.log(989899);

    const { data, errors, status }: IResponse<T> = await firstValueFrom(
      this.service.send(pattern, args),
    );
    console.log(status, errors);
    if (status !== HttpStatus.CREATED && status !== HttpStatus.OK) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }
}
