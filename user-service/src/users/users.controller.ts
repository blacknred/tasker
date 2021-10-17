import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto, GetValidatedUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import {
  UsersResponseDto,
  ResponseDto,
  UserResponseDto,
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
  getOne(@Payload() { id }: GetUserDto): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @MessagePattern('getOneValidated')
  getdOneValidate(
    @Payload() getValidatedUserDto: GetValidatedUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.findOneValidated(getValidatedUserDto);
  }

  @MessagePattern('update')
  update(@Payload() updateUserDto: UpdateUserDto): Promise<UserResponseDto> {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('delete')
  remove(@Payload() id: number): Promise<ResponseDto> {
    return this.usersService.remove(id);
  }
}
