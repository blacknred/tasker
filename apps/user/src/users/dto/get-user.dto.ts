import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetUserDto {
  @ApiProperty({ type: 'number', example: 1 })
  @IsOptional()
  @IsNumberString({ message: 'Must be a number' })
  id: number;
}
