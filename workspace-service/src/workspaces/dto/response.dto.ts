import {
  PaginatedResponseDto,
  ResponseDto,
} from '../../__shared__/dto/response.dto';
import { IWorkspace } from '../interfaces/workspace.interface';

export class WorkspaceResponseDto extends ResponseDto<IWorkspace> {}

export class WorkspacesResponseDto extends PaginatedResponseDto<IWorkspace> {}
