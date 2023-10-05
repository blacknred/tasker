import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { PERMISSION_KEY } from '../consts';
import { Permission } from '../enums';
import { PermissionGuard } from '../guards';

export function Permission(...permissions: Permission[]) {
  return applyDecorators(
    ApiForbiddenResponse({ description: 'No project access' }),
    SetMetadata(PERMISSION_KEY, permissions),
    UseGuards(PermissionGuard),
  );
}
