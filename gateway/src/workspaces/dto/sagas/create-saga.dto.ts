import { ApiProperty } from '@nestjs/swagger';

export class CreateSagaDto {
  @ApiProperty({ example: 'testsaga' })
  name: string;

  @ApiProperty({ example: 'test description', required: false })
  description?: string;

  @ApiProperty({ example: new Date().toDateString(), required: false })
  expiresAt?: string;
}
