import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AuthGuard } from '../guards/auth.guard';

export const auth = () =>
  applyDecorators(
    ApiCookieAuth(),
    // @ApiBasicAuth()
    // @ApiBearerAuth()
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  );

export function Auth() {
  return applyDecorators(auth(), UseGuards(AuthGuard));
}
