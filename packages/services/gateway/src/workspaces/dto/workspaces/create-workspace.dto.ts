import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'testworkspace' })
  name: string;

  @ApiProperty({ example: 'test description', required: false })
  description?: string;
}
