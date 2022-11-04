import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { PRIVILEGE_KEY } from '../consts';
import { PrivilegeGuard } from '../guards/privilege.guard';

export function WithPrivilege(...privileges: string[]) {
  return applyDecorators(
    SetMetadata(PRIVILEGE_KEY, privileges),
    UseGuards(PrivilegeGuard),
  );
}
