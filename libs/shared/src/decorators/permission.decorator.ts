import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { PERMISSION_KEY } from '../consts';
import { ProjectPermissionGuard } from '../guards';

export function Permission(...permissions: string[]) {
  return applyDecorators(
    ApiForbiddenResponse({ description: 'No project access' }),
    SetMetadata(PERMISSION_KEY, permissions),
    UseGuards(ProjectPermissionGuard),
  );
}
