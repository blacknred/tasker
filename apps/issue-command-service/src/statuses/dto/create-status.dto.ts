import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsHexColor,
  IsOptional,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateStatusDto {
  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  projectId: string;

  @ApiProperty({ type: 'string', example: 'TESTING' })
  @Length(3, 30, { message: 'Must have from 3 to 30 chars' })
  name: string;

  @ApiProperty({ type: 'hex color', example: '#333333' })
  @IsOptional()
  @IsHexColor({ message: 'Non valid hex color' })
  color?: string;

  @ApiProperty({ type: 'boolean', example: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isFirst: boolean;

  @ApiProperty({ type: 'boolean', example: false })
  @IsOptional()
  @IsBoolean({ message: 'Must be a boolean' })
  isLast: boolean;
}
