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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthedGuard } from 'src/auth/guards/authed.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IAuth } from 'src/auth/interfaces/auth.interface';
import { EmptyResponseDto } from 'src/__shared__/dto/empty-response.dto';
import { FeedInterceptor } from 'src/__shared__/interceptors/feed.interceptors';
import { USER_SERVICE } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersResponseDto } from './dto/users-response.dto';
import { Role } from './interfaces/user.interface';

@Controller('users')
@ApiTags('Users')
@UseInterceptors(FeedInterceptor)
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
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: UsersResponseDto })
  async getAll(@Query() params: GetUsersDto): Promise<UsersResponseDto> {
    return this.userService.send('getAll', params).toPromise();
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getOne(@Param() { id }: GetUserDto): Promise<UserResponseDto> {
    return this.userService.send('getOne', +id).toPromise();
  }

  @Patch()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Update authorized user entity' })
  @ApiOkResponse({ type: UserResponseDto })
  async update(
    @Auth() { id }: IAuth,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService
      .send('update', { id, ...updateUserDto })
      .toPromise();
  }

  @Delete()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Delete authorized user entity' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth() { id }: IAuth): Promise<EmptyResponseDto> {
    return this.userService.send('delete', +id).toPromise();
  }
}
