import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { LoggedInGuard } from 'src/auth/guards/logged-in.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { EmptyResponseDto } from './dto/empty-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@Controller('v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(LoggedInGuard)
  @Get()
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  getOne(@Session() { id }: { id: number }) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(LoggedInGuard)
  @Patch()
  @ApiCreatedResponse({
    type: UserResponseDto,
  })
  update(
    @Session() { id }: { id: number },
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(+id, updateUserDto);
  }

  @UseGuards(LoggedInGuard)
  @Delete()
  @ApiCreatedResponse({
    type: EmptyResponseDto,
  })
  remove(@Session() { id }: { id: number }) {
    return this.usersService.remove(+id);
  }
}
