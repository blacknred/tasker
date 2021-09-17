import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { userService } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/create-auth';
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
      throw new HttpException(
        {
          data: null,
          errors,
        },
        status,
      );
    }

    return {
      data,
      errors: null,
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
