import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkspaceDto {
  @ApiProperty({ example: 'testworkspace', nullable: false })
  name: string;

  @ApiProperty({ example: 'test description' })
  description?: string;
}
