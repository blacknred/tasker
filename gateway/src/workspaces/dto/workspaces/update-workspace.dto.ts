import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  BaseLabel,
  BaseStage,
} from 'src/workspaces/interfaces/workspace.interface';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: Object.values(BaseStage),
  })
  taskStages?: string[];

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: Object.values(BaseLabel),
  })
  taskLabels?: string[];

  @ApiProperty({ type: 'string', example: 'TODO' })
  doneStage?: string;
}
