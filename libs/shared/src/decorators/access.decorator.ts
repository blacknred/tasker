import { applyDecorators, UseGuards } from '@nestjs/common';
import { ProjectAccessGuard } from '../guards';

export function Access() {
  return applyDecorators(UseGuards(ProjectAccessGuard));
}
