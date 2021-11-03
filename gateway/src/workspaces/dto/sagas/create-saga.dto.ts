import { ApiProperty } from '@nestjs/swagger';

export class CreateSagaDto {
  @ApiProperty({ example: 'test saga', nullable: false })
  name: string;

  @ApiProperty({ example: 'test description' })
  description?: string;

  @ApiProperty({ example: '123234123424' })
  expiresAt?: string;
}
