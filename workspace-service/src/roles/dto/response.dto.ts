import {
  PaginatedResponseDto,
  ResponseDto,
} from '../../__shared__/dto/response.dto';
import { IRole } from '../interfaces/role.interface';

export class RoleResponseDto extends ResponseDto<IRole> {}

export class RolesResponseDto extends PaginatedResponseDto<IRole> {}
