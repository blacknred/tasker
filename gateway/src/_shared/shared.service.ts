import { HttpException, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable, timeout, zip } from 'rxjs';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class SharedService {
  // protected client: ClientProxy;

  set client(client: ClientProxy) {
    this.client = client;
  }

  async feed<T>(pattern: string, args: unknown): Promise<IResponse<T>> {
    // const { data, errors, status } = await firstValueFrom(
    //   this.client.send<IResponse<T>>(pattern, args),
    // );

    // if (status !== HttpStatus.CREATED && status !== HttpStatus.OK) {
    //   throw new HttpException({ errors }, status);
    // }

    // return { data };
    const startAt = Date.now();

    return this.client
      .send<T>(pattern, args)
      .pipe(timeout(5000))
      .pipe(map((payload: any) => ({ ...payload, time: Date.now() - startAt })))
      .toPromise()
      .catch((error) => {
        throw new HttpException(error, error.status);
      });
  }

  async feedAll(reqs: Observable<IResponse<unknown>>[]) {
    return zip(...reqs).pipe(map((resps) => ({ ...resps })));
  }
}
