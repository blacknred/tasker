import {
  Body, Controller, Delete, Param, Patch, Post, SetMetadata
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { EmptyResponseDto } from './dto/empty-response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

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
}
