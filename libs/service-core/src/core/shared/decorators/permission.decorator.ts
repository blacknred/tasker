import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PERMISSION_KEY } from '../consts';
import { ProjectPermissionGuard } from '../guards/project-permission.guard';

export function Permission(...permissions: string[]) {
  return applyDecorators(
    SetMetadata(PERMISSION_KEY, permissions),
    UseGuards(ProjectPermissionGuard),
  );
}
