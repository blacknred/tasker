import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards';

export function Authentication() {
  return applyDecorators(
    ApiCookieAuth(),
    // @ApiBasicAuth()
    // @ApiBearerAuth()
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    UseGuards(AuthGuard),
  );
}
