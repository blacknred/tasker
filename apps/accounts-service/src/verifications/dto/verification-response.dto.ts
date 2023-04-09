import { ApiProperty } from '@nestjs/swagger';
import { IVerification, ResponseDto } from '@taskapp/shared';

export const verificationMock: IVerification = {
  endsAt: '2022-08-14 13:55:16.622111',
  email: 'test@email.com',
  isVerified: false,
};

export class VerificationResponseDto extends ResponseDto<IVerification> {
  @ApiProperty({ example: verificationMock, required: false })
  readonly data?: IVerification;
}
