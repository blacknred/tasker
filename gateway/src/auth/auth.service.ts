import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { cacheService, userService } from './consts';
import { CreateAuthDto } from './dto/create-auth';
import { IResponse } from './interfaces/response.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(userService) private readonly userService: ClientProxy,
    @Inject(cacheService) private readonly cacheService: ClientProxy,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    const { data, errors, status }: IResponse<IUser[]> = await firstValueFrom(
      this.userService.send('getAll', createAuthDto),
    );

    if (status !== HttpStatus.OK) {
      throw new HttpException(
        {
          data: null,
          errors,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      data: null,
      errors: null,
    };
  }

  async findOne(userId: number) {
    return {
      data: {},
      errors: null,
    };
  }

  remove(userId: number) {
    return {
      data: null,
      errors: null,
    };
  }
}
