import { ApiProperty } from '@nestjs/swagger';

export class GetTasksDto {
  @ApiProperty({
    required: false,
    example: 20,
    nullable: false,
  })
  limit: number;
  @ApiProperty({
    required: false,
    example: 1,
  })
  page: number;
}
