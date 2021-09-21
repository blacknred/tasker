import { SetMetadata } from '@nestjs/common';
import { rolesKey } from '../consts';

export const Roles = (...roles: string[]) => SetMetadata(rolesKey, roles);
