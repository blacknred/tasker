import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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
import { GetTaskDto } from 'src/tasks/dto/get-task.dto';
import { GetTasksDto } from 'src/tasks/dto/get-tasks.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EmptyResponseDto } from './dto/empty-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersResponseDto } from './dto/users-response.dto';
import { Role } from './interfaces/user.interface';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user entity' })
  @ApiCreatedResponse({ type: UserResponseDto })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.feed('create', createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'List all tasks' })
  @ApiOkResponse({ type: UsersResponseDto })
  async getAll(@Param() params: GetTasksDto): Promise<UsersResponseDto> {
    return this.usersService.feed('getAll', params);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiOkResponse({ type: UserResponseDto })
  async getOne(@Param() { id }: GetTaskDto): Promise<UserResponseDto> {
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
