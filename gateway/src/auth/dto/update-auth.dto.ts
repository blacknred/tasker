import { ApiProperty } from '@nestjs/swagger';
import { IPushSubscription } from '../interfaces/auth.interface';

export class UpdateAuthDto {
  @ApiProperty({ example: 'testpassword' })
  pushSubscription: IPushSubscription;
}
