import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@taskapp/shared';

export class TFASecretResponseDto extends ResponseDto<string> {
  @ApiProperty({ example: 'data:image/svg+xml...', required: false })
  readonly data?: string;
}
