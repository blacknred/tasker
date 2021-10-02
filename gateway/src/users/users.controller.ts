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
  UseGuards,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthedGuard } from 'src/auth/guards/authed.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IAuthedRequest } from 'src/auth/interfaces/authed-request.interface';
import { EmptyResponseDto } from 'src/shared/dto/empty-response.dto';
import { SharedService } from 'src/shared/shared.service';
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
export class UsersController {
  constructor(
    private readonly usersService: SharedService,
    @Inject(USER_SERVICE) protected readonly client: ClientProxy,
  ) {
    this.usersService.client = client;
  }

  @Post()
  @ApiOperation({ summary: 'Create new user entity' })
  @ApiCreatedResponse({ type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.feed('create', createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all users' })
  @ApiOkResponse({ type: UsersResponseDto })
  async getAll(@Query() params: GetUsersDto): Promise<UsersResponseDto> {
    return this.usersService.feed('getAll', params);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getOne(@Param() { id }: GetUserDto): Promise<UserResponseDto> {
    return this.usersService.feed('getOne', +id);
  }

  @Patch()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Update authorized user entity' })
  @ApiOkResponse({ type: UserResponseDto })
  async update(
    @Req() { user: { id } }: IAuthedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.feed('update', { id, ...updateUserDto });
  }

  @Delete()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Delete authorized user entity' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Req() { user }: IAuthedRequest): Promise<EmptyResponseDto> {
    return this.usersService.feed('delete', +user.id);
  }
}
