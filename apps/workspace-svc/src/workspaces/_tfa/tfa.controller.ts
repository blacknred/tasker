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
} from '@taskapp/shared';
import { TfaService } from './tfa.service';
import {
  AccountResponseDto,
  CreateAccountDto,
  GetValidatedAccountDto,
  PassTfaDto,
  UpdateAccountDto,
} from './dto';

@ApiTags('2FA')
@Controller('2fa')
@Authentication()
@UseFilters(AllExceptionFilter)
export class TfaController {
  constructor(private readonly tfaService: TfaService) {}

  @Post()
  @ApiOperation({ description: 'Create 2fa' })
  @ApiCreatedResponse({ type: AccountResponseDto })
  async create(@Body() dto: CreateAccountDto): Promise<AccountResponseDto> {
    return this.tfaService.create(dto);
  }

  @Get('auth')
  @ApiOperation({ description: 'Find account by credentials' })
  @ApiOkResponse({ type: AccountResponseDto })
  async getValidated(
    @Body() dto: GetValidatedAccountDto,
  ): Promise<AccountResponseDto> {
    return this.tfaService.findOneWithCredentials(dto);
  }

  @Patch()
  @Authentication()
  @ApiOperation({ description: 'Enable 2fa' })
  @ApiOkResponse({ type: 'string' })
  async enable(
    @Auth('userId') userId,
    @Body() dto: PassTfaDto,
  ): Promise<string> {
    return this.tfaService.enable(userId, dto);
  }

  @Delete()
  @ApiOperation({ description: 'Disable 2fa' })
  @ApiOkResponse({ type: EmptyResponseDto })
  async disable(@Auth('userId') userId): Promise<EmptyResponseDto> {
    return this.tfaService.delete(userId);
  }
}
