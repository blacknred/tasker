import { applyDecorators, UseGuards } from '@nestjs/common';
import { AdminGuard } from '../guards/admin.guard';
import { auth } from './auth.decorator';

export function Admin() {
  return applyDecorators(auth(), UseGuards(AdminGuard));
}
