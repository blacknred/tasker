import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from './dto/response.dto';
import { GetUsersDto } from './dto/get-users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create')
  create(
    @Payload() createUserDto: CreateUserDto,
  ): Promise<ResponseDto<CreateUserDto>> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('getAll')
  findAll(
    @Payload() params: GetUsersDto,
  ): Promise<ResponseDto<UpdateUserDto[]>> {
    return this.usersService.findAll(params);
  }

  @MessagePattern('getOne')
  findOne(@Payload() id: number): Promise<ResponseDto<UpdateUserDto>> {
    return this.usersService.findOne(id);
  }

  @MessagePattern('update')
  update(
    @Payload() updateUserDto: UpdateUserDto,
  ): Promise<ResponseDto<UpdateUserDto>> {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('delete')
  remove(@Payload() id: number): Promise<ResponseDto> {
    return this.usersService.remove(id);
  }
}
