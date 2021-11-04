import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateWorkspaceDto } from './create-workspace.dto';

export class UpdateWorkspaceDto extends PartialType(CreateWorkspaceDto) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['TODO', 'IN_PROGRESS', 'DONE'],
  })
  taskStages?: string[];

  @ApiProperty({
    type: 'string',
    isArray: true,
    example: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
  })
  taskLabels?: string[];

  @ApiProperty({ type: 'string', example: 'TODO' })
  doneStage?: string;
}
