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

@Controller('v1/users')
@ApiTags('tasks')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @SetMetadata('auth', true)
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @SetMetadata('auth', true)
  @ApiCreatedResponse({
    type: EmptyResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  //

  @Post('/auth')
  @ApiCreatedResponse({
    type: LoginResponseDto,
  })
  async createAuth(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<LoginResponseDto> {
    return this.usersService.createAuth(loginUserDto);
  }

  @Get('/auth')
  async getAuth(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    return this.usersService.findAuth(loginUserDto);
  }

  @Delete('/auth')
  @SetMetadata('auth', true)
  @ApiCreatedResponse({
    type: EmptyResponseDto,
  })
  removeAuth(@Req() { user }: IAuthRequest): EmptyResponseDto {
    return this.usersService.removeAuth(user.id);
  }
}
