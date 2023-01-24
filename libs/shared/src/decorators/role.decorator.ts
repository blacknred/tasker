import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { ProjectRoleGuard } from '../guards';

export function Role() {
  return applyDecorators(
    ApiForbiddenResponse({ description: 'No project access' }),
    UseGuards(ProjectRoleGuard),
  );
}
