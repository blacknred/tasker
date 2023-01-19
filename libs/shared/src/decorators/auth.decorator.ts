import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { AdminGuard, AuthGuard } from '../guards';

export const apiAuth = [
  ApiCookieAuth(),
  // @ApiBasicAuth()
  // @ApiBearerAuth()
  ApiUnauthorizedResponse({ description: 'Unauthorized' }),
];

export function Auth() {
  return applyDecorators(...apiAuth, UseGuards(AuthGuard));
}

export function Admin() {
  return applyDecorators(...apiAuth, UseGuards(AdminGuard));
}
