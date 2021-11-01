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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/__shared__/decorators/auth.decorator';
import { WithAuth } from 'src/__shared__/decorators/with-auth.decorator';
import { EmptyResponseDto } from 'src/__shared__/dto/response.dto';
import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { ProxyInterceptor } from 'src/__shared__/interceptors/proxy.interceptor';
import { USER_SERVICE } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
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
  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({ type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.send('create', createUserDto).toPromise();
  }

  @Get()
  @WithAuth()
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: UsersResponseDto })
  async getAll(@Query() getUsersDto: GetUsersDto): Promise<UsersResponseDto> {
    return this.userService.send('getAll', getUsersDto).toPromise();
  }

  @Get(':id')
  @WithAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getOne(@Param() getUserDto: GetUserDto): Promise<UserResponseDto> {
    return this.userService.send('getOne', getUserDto).toPromise();
  }

  @Patch()
  @WithAuth()
  @ApiOperation({ summary: 'Update authorized user' })
  @ApiOkResponse({ type: UserResponseDto })
  async update(
    @Auth('user') { id },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.send('patch', { id, ...updateUserDto }).toPromise();
  }

  @Patch('restore')
  @WithAuth()
  @ApiOperation({ summary: 'Restore user' })
  @ApiOkResponse({ type: UserResponseDto })
  async restore(
    @Auth('user') { id },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService
      .send('restore', { id, ...updateUserDto })
      .toPromise();
  }

  @Delete()
  @WithAuth()
  @ApiOperation({ summary: 'Delete authorized user' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth('user') { id }, @Req() req): Promise<EmptyResponseDto> {
    req.session.destroy();
    return this.userService.send('delete', { id }).toPromise();
  }
}
