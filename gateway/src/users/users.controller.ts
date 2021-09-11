import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  SetMetadata,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { IAuthRequest } from './interfaces/auth-request.interface';
import { EmptyResponseDto } from './dto/empty-response.dto';

@Controller('users')
@ApiTags('tasks')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Post('/login')
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginResponseDto> {
    return this.usersService.login(loginUserDto);
  }

  @Post('/logout')
  @SetMetadata('auth', true)
  @ApiCreatedResponse({
    type: EmptyResponseDto,
  })
  logoutUser(@Req() { user }: IAuthRequest): EmptyResponseDto {
    return this.usersService.logout(user.id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
