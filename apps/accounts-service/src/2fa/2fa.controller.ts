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
  IAuth,
} from '@taskapp/shared';
import { AccountsService } from './accounts.service';
import {
  AccountResponseDto,
  CreateAccountDto,
  GetValidatedAccountDto,
  RestoreAccountDto,
  UpdateAccountDto,
} from './dto';
import {
  TFACodeResponseDto,
  TFASecretResponseDto,
} from './dto/2fa-secret-response.dto';

@ApiTags('2FA')
@Controller('2fa')
@Authentication()
@UseFilters(AllExceptionFilter)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  @ApiOperation({ description: 'Create 2fa' })
  @ApiCreatedResponse({ type: AccountResponseDto })
  async create(@Body() dto: CreateAccountDto): Promise<AccountResponseDto> {
    return this.accountsService.create(dto);
  }

  @Get()
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

  @Delete()
  @ApiOperation({ description: 'Disable own account' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth('userId') userId): Promise<EmptyResponseDto> {
    return this.accountsService.delete(userId);
  }

  //

  @Post('2fa')
  @Authentication()
  @ApiOperation({ description: 'Create 2fa secret' })
  @ApiOkResponse({ type: TFASecretResponseDto })
  async createTFASecret(@Auth('userId') userId): Promise<TFASecretResponseDto> {
    return this.accountsService.get2faSecretCode(userId);
  }

  @Get('2fa/validate')
  @Authentication()
  @ApiOperation({ description: 'Get 2fa secret' })
  @ApiOkResponse({ type: TFASecretResponseDto })
  async getTFASecret(@Auth('userId') userId): Promise<TFASecretResponseDto> {
    return this.accountsService.get2faSecretCode(userId);
  }

  @Patch('2fa')
  @Authentication()
  @ApiOperation({ description: 'Delete own account' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth('userId') userId): Promise<EmptyResponseDto> {
    return this.accountsService.softDelete(userId);
  }

  @Delete('2fa')
  @Authentication()
  @ApiOperation({ description: 'Delete own account' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async remove(@Auth('userId') userId): Promise<EmptyResponseDto> {
    return this.accountsService.softDelete(userId);
  }
}

