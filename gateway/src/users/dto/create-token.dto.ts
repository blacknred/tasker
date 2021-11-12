import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({ uniqueItems: true, example: 'test@email.com' })
  email: string;

  @ApiProperty({ example: true, required: false })
  exist?: boolean;
}
