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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthedGuard } from 'src/auth/guards/authed.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
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
import { Role } from './interfaces/user.interface';

@ApiTags('Users')
@Controller('users')
@UseFilters(AllExceptionFilter)
@UseInterceptors(ProxyInterceptor)
export class UsersController {
  constructor(
    @Inject(USER_SERVICE) protected readonly userService: ClientProxy,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new user entity' })
  @ApiCreatedResponse({ type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.send('create', createUserDto).toPromise();
  }

  @Get()
  // @Roles(Role.ADMIN)
  // @UseGuards(RoleGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: UsersResponseDto })
  async getAll(@Query() getUsersDto: GetUsersDto): Promise<UsersResponseDto> {
    return this.userService.send('getAll', getUsersDto).toPromise();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RoleGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getOne(@Param() getUserDto: GetUserDto): Promise<UserResponseDto> {
    return this.userService.send('getOne', getUserDto).toPromise();
  }

  @Patch()
  @UseGuards(AuthedGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Update authorized user entity' })
  @ApiOkResponse({ type: UserResponseDto })
  async update(
    @Auth('user') { id },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService
      .send('update', { id, ...updateUserDto })
      .toPromise();
  }

  @Delete()
  @UseGuards(AuthedGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Delete authorized user entity' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth('user') { id }, @Req() req): Promise<EmptyResponseDto> {
    req.session.destroy();
    return this.userService.send('delete', { id }).toPromise();
  }
}
