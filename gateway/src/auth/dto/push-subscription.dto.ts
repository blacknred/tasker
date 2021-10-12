import { ApiProperty } from '@nestjs/swagger';

class PushSubscriptionKeysDto {
  @ApiProperty({ example: 'ertwieportp4352' })
  auth: string;
  @ApiProperty({ example: '980eawe8rq809' })
  p256dh: string;
}

export class PushSubscriptionDto {
  @ApiProperty({ example: 'http://example.com' })
  endpoint: string;
  @ApiProperty({ type: PushSubscriptionKeysDto })
  keys: PushSubscriptionKeysDto;
  @ApiProperty({ example: 12 })
  expirationTime?: number;
}
