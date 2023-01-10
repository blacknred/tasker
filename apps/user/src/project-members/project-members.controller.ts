
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { CreateUserDto } from './dto/create-project-member.dto';
import { GetUserDto } from './dto/get-project-member.dto';
import { GetUsersDto } from './dto/get-project-members.dto';
import { UserResponseDto, UsersResponseDto } from './dto/project-member-response.dto';
import { RestoreUserDto } from './dto/restore-user.dto';
import { UpdateUserDto } from './dto/update-project-member.dto';
import { UsersService } from './teammates.service';

@Controller()
export class ProjectMembersController {
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
