import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto } from '@taskapp/shared';
import { IsOptional, IsUUID } from 'class-validator';

export class GetEventsDto extends OffsetPaginationDto {
  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId?: string;
}
