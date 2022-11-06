import { ApiProperty } from '@nestjs/swagger';
import { IWorkspace } from 'src/workspaces/interfaces/workspace.interface';
import { PaginatedResponseDto } from 'src/__shared__/dto/response.dto';
import { workspaceMock } from './workspace-response.dto';

const workspacePaginationMock = {
  hasMore: true,
  total: 100,
  items: [workspaceMock],
};

export class WorkspacesResponseDto extends PaginatedResponseDto<IWorkspace> {
  @ApiProperty({ example: workspacePaginationMock })
  data: {
    hasMore: boolean;
    total: number;
    items: IWorkspace[];
  };
}
