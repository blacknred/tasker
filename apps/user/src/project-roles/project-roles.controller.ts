import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { CreateUserDto } from './dto/create-project-role.dto';
import { GetUserDto } from './dto/get-project-role.dto';
import { GetUsersDto } from './dto/get-project-roles.dto';
import { UserResponseDto, UsersResponseDto } from './dto/project-role-response.dto';
import { RestoreUserDto } from './dto/restore-role.dto';
import { UpdateUserDto } from './dto/update-project-role.dto';
import { UsersService } from './project.service';

@Controller()
export class ProjectRolesController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users/create')
  async create(
    @Payload() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @MessagePattern('users/getAll')
  async getAll(@Payload() getUsersDto: GetUsersDto): Promise<UsersResponseDto> {
    return this.usersService.findAll(getUsersDto);
  }

  @MessagePattern('users/getOne')
  async getOne(
    @Payload() { id, partial, ...rest }: GetUserDto,
  ): Promise<UserResponseDto> {
    if (id) return this.usersService.findOne(id, partial);
    return this.usersService.findOneValidated(rest);
  }

  @MessagePattern('users/update')
  async update(
    @Payload() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.update(updateUserDto);
  }

  @MessagePattern('users/delete')
  async remove(@Payload() { id }: GetUserDto): Promise<ResponseDto> {
    return this.usersService.remove(id);
  }

  @MessagePattern('users/restore')
  async restore(
    @Payload() restoreUserDto: RestoreUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.restore(restoreUserDto);
  }
}
