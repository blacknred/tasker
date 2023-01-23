import { applyDecorators, UseGuards } from '@nestjs/common';
import { ProjectRoleGuard } from '../guards';

export function Role() {
  return applyDecorators(UseGuards(ProjectRoleGuard));
}
