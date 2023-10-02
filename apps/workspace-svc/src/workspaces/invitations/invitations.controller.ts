import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AllExceptionFilter,
  Auth,
  Authentication,
  IAuth,
  Permission,
  Permission,
} from '@taskapp/shared';
import { CreateInvitationDto, InvitationResponseDto } from './dto';
import { InvitationsService } from './invitations.service';

@Authentication()
@ApiTags('Invitations')
@Controller('invitations')
@UseFilters(AllExceptionFilter)
export class InvitationsController {
  constructor(private readonly invitationsService: InvitationsService) {}

  @Post()
  @ApiOperation({ description: 'Create invitation' })
  @ApiCreatedResponse({ type: InvitationResponseDto })
  @Permission(Permission.PROJECT_MANAGEMENT)
  async create(
    @Auth() auth: IAuth,
    @Body() dto: CreateInvitationDto,
  ): Promise<InvitationResponseDto> {
    return this.invitationsService.create(dto, auth);
  }
}
