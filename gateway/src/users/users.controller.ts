import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/__shared__/decorators/auth.decorator';
import {
  WithCreatedApi,
  WithOkApi,
} from 'src/__shared__/decorators/with-api.decorator';
import { WithAuth } from 'src/__shared__/decorators/with-auth.decorator';
import { EmptyResponseDto } from 'src/__shared__/dto/response.dto';
import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { ProxyInterceptor } from 'src/__shared__/interceptors/proxy.interceptor';
import { USER_SERVICE } from './consts';
import { CreateTokenDto } from './dto/create-token.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { RestoreUserDto } from './dto/restore-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersResponseDto } from './dto/users-response.dto';

@ApiTags('Users')
@Controller('users')
@UseFilters(AllExceptionFilter)
@UseInterceptors(ProxyInterceptor)
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) protected readonly userService: ClientProxy,
  ) {}

  @Post()
  @WithCreatedApi(UserResponseDto, 'Create new user')
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.send('create', createUserDto).toPromise();
  }

  @Post('token')
  @WithCreatedApi(UserResponseDto, 'Create new email token')
  async createToken(
    @Body() createTokenDto: CreateTokenDto,
  ): Promise<EmptyResponseDto> {
    return this.userService.send('createToken', createTokenDto).toPromise();
  }

  @Get()
  @WithAuth()
  @WithOkApi(UsersResponseDto, 'List all users')
  async getAll(
    @Auth('user') { isAdmin },
    @Query() getUsersDto: GetUsersDto,
  ): Promise<UsersResponseDto> {
    return this.userService
      .send('getAll', { ...getUsersDto, partial: !isAdmin })
      .toPromise();
  }

  @Get(':id')
  @WithAuth(true)
  @WithOkApi(UserResponseDto, 'Get user by id')
  async getOne(@Param() { id }: GetUserDto): Promise<UserResponseDto> {
    return this.userService.send('getOne', { id: +id }).toPromise();
  }

  @Patch()
  @WithAuth()
  @WithOkApi(UserResponseDto, 'Update authorized user')
  async update(
    @Auth('user') { id },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService
      .send('update', { id, ...updateUserDto })
      .toPromise();
  }

  @Patch('restore')
  @WithOkApi(UserResponseDto, 'Restore user')
  async restore(
    @Body() restoreUserDto: RestoreUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.send('restore', restoreUserDto).toPromise();
  }

  @Delete()
  @WithAuth()
  @WithOkApi(EmptyResponseDto, 'Delete authorized user')
  async remove(@Auth('user') { id }, @Req() req): Promise<EmptyResponseDto> {
    req.session.destroy();
    return this.userService.send('delete', { id }).toPromise();
  }
}
