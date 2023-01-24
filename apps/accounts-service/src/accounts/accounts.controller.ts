import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AllExceptionFilter,
  Auth,
  Authentication,
  EmptyResponseDto,
} from '@taskapp/shared';
import { AccountsService } from './accounts.service';
import { AccountResponseDto, CreateAccountDto, UpdateAccountDto } from './dto';

@Authentication()
@ApiTags('Accounts')
@Controller('account')
@UseFilters(AllExceptionFilter)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ description: 'Create account' })
  @ApiCreatedResponse({ type: AccountResponseDto })
  async create(@Body() dto: CreateAccountDto): Promise<AccountResponseDto> {
    return this.accountsService.create(dto);
  }

  @Get()
  @ApiOperation({ description: 'Get account' })
  @ApiOkResponse({ type: AccountResponseDto })
  async getOne(@Auth('userId') userId): Promise<AccountResponseDto> {
    return this.accountsService.find(userId);
  }

  //   @Get()
  //   @WithAuth()
  //   @WithOkApi(UsersResponseDto, 'List all users')
  //   async getAll(
  //     @Auth() { id },
  //     @Query() getUsersDto: GetUsersDto,
  //   ): Promise<UsersResponseDto> {
  //     return this.usersService.findAll(id, getUsersDto);
  //   }

  //   @Get(':id')
  //   @WithAuth()
  //   @WithOkApi(UserResponseDto, 'Get user by id')
  //   async getOne(
  //     @Auth() { id: uid },
  //     @Param() { id }: GetUserDto,
  //   ): Promise<UserResponseDto> {
  //     return this.usersService.findOne(uid, id);
  //   }

  @Patch()
  @ApiOperation({ description: 'Update account' })
  @ApiOkResponse({ type: AccountResponseDto })
  async update(
    @Auth('userId') userId,
    @Body() dto: UpdateAccountDto,
  ): Promise<AccountResponseDto> {
    return this.accountsService.update(userId, dto);
  }

  @Delete()
  @ApiOperation({ description: 'Delete account' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth('userId') userId): Promise<EmptyResponseDto> {
    return this.accountsService.remove(userId);
  }
}
