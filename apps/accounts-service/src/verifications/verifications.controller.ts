import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '@taskapp/shared';
import {
  CreateVerificationDto,
  GetVerificationDto,
  VerificationResponseDto,
} from './dto';
import { VerificationsService } from './verifications.service';

@ApiTags('Verifications')
@Controller('verifications')
@UseFilters(AllExceptionFilter)
export class VerificationsController {
  constructor(private readonly confirmationService: VerificationsService) {}

  @Post()
  @ApiOperation({ description: 'Create verification code' })
  @ApiCreatedResponse({ type: VerificationResponseDto })
  async create(
    @Body() dto: CreateVerificationDto,
  ): Promise<VerificationResponseDto> {
    return this.confirmationService.create(dto);
  }

  @Patch(':code')
  @ApiOperation({ description: 'Confirm verification code' })
  @ApiCreatedResponse({ type: VerificationResponseDto })
  async update(
    @Param() { code }: GetVerificationDto,
  ): Promise<VerificationResponseDto> {
    return this.confirmationService.confirm(code);
  }
}
