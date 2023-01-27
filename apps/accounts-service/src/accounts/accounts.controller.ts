import { Body, Controller, Get, Patch, Post, UseFilters } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
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
import {
  AccountResponseDto,
  CreateAccountDto,
  GetValidatedAccountDto,
  RestoreAccountDto,
  UpdateAccountDto,
} from './dto';

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
  @Authentication()
  @ApiOperation({ description: 'Get account' })
  @ApiOkResponse({ type: AccountResponseDto })
  async getOne(@Auth('userId') userId): Promise<AccountResponseDto> {
    return this.accountsService.findOne(userId);
  }

  @Get('validate')
  @ApiOperation({ description: 'Find account by credentials' })
  @ApiOkResponse({ type: AccountResponseDto })
  async getValidated(
    @Body() dto: GetValidatedAccountDto,
  ): Promise<AccountResponseDto> {
    return this.accountsService.findOneWithCredentials(dto);
  }

  @Patch()
  @Authentication()
  @ApiOperation({ description: 'Update an account' })
  @ApiNoContentResponse({ type: AccountResponseDto })
  async update(
    @Auth('userId') userId,
    @Body() dto: UpdateAccountDto,
  ): Promise<AccountResponseDto> {
    return this.accountsService.update(userId, dto);
  }

  @Patch('restore')
  @ApiOperation({ description: 'Update own password before auth' })
  @ApiNoContentResponse({ type: EmptyResponseDto })
  async restore(@Body() dto: RestoreAccountDto): Promise<EmptyResponseDto> {
    return this.accountsService.restore(dto);
  }

  @Patch('delete')
  @Authentication()
  @ApiOperation({ description: 'Delete own account' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth('userId') userId): Promise<EmptyResponseDto> {
    return this.accountsService.delete(userId);
  }
}
