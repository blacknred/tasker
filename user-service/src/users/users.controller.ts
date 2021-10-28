import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import {
  ResponseDto,
  UserResponseDto,
  UsersResponseDto,
} from './dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create')
  create(@Payload() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('getAll')
  getAll(@Payload() getUsersDto: GetUsersDto): Promise<UsersResponseDto> {
    return this.usersService.findAll(getUsersDto);
  }

  @MessagePattern('getOne')
  getOne(@Payload() { id, ...rest }: GetUserDto): Promise<UserResponseDto> {
    if (id) return this.usersService.findOne(id);
    return this.usersService.findOneValidated(rest);
  }

  @MessagePattern('patch')
  update(@Payload() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('delete')
  remove(@Payload() { id }: GetUserDto): Promise<ResponseDto> {
    return this.usersService.remove(id);
  }

  @MessagePattern('restore')
  restore(@Payload() { id }: GetUserDto): Promise<UserResponseDto> {
    return this.usersService.restore(id);
  }
}
