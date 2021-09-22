import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { userService } from './consts';
import { IResponse } from './interfaces/response.interface';

@Injectable()
export class UsersService {
  constructor(@Inject(userService) private readonly userService: ClientProxy) {}

  async feed<T>(pattern: string, args: Record<string, unknown>) {
    const { data, errors, status }: IResponse<T> = await firstValueFrom(
      this.userService.send(pattern, args),
    );

    if (status !== HttpStatus.CREATED && status !== HttpStatus.OK) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }
}
