import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseDto } from './dto/response.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserDto, GetValidatedUserDto } from './dto/get-user.dto';
import { IUser } from './interfaces/user.interface';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('create')
  create(@Payload() createUserDto: CreateUserDto): Promise<ResponseDto<IUser>> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('getAll')
  getAll(@Payload() getUsersDto: GetUsersDto): Promise<ResponseDto<IUser[]>> {
    return this.usersService.findAll(getUsersDto);
  }

  @MessagePattern('getOne')
  getOne(@Payload() { id }: GetUserDto): Promise<ResponseDto<IUser>> {
    return this.usersService.findOne(id);
  }

  @MessagePattern('getOneValidated')
  getdOneValidate(
    @Payload() getValidatedUserDto: GetValidatedUserDto,
  ): Promise<ResponseDto<IUser>> {
    return this.usersService.findOneValidated(getValidatedUserDto);
  }

  @MessagePattern('update')
  update(@Payload() updateUserDto: UpdateUserDto): Promise<ResponseDto<IUser>> {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @MessagePattern('delete')
  remove(@Payload() id: number): Promise<ResponseDto<null>> {
    return this.usersService.remove(id);
  }
}
