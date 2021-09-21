import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { userService } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IResponse } from './interfaces/response.interface';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@Inject(userService) private readonly userService: ClientProxy) {}

  async create(createUserDto: CreateUserDto) {
    const { data, errors, status }: IResponse<IUser> = await firstValueFrom(
      this.userService.send('create', createUserDto),
    );

    if (status !== HttpStatus.CREATED) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }

  async findOne(id: number) {
    const { data, errors, status }: IResponse<IUser> = await firstValueFrom(
      this.userService.send('getOne', id),
    );

    if (status !== HttpStatus.OK) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { data, errors, status }: IResponse<IUser> = await firstValueFrom(
      this.userService.send('update', { id, ...updateUserDto }),
    );

    if (status !== HttpStatus.OK) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }

  async remove(id: number) {
    const { data, errors, status }: IResponse<null> = await firstValueFrom(
      this.userService.send('remove', id),
    );

    if (status !== HttpStatus.OK) {
      throw new HttpException({ errors }, status);
    }

    return { data };
  }
}
