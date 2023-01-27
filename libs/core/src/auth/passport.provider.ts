import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthHeaders } from '@taskapp/shared';
import type { Request } from 'express';
import custom from 'passport-custom';

@Injectable()
export class AuthStrategy extends PassportStrategy(
  custom.Strategy,
  'headers-auth',
) {
  async validate(request: Request) {
    const session = AuthHeaders.getDeserializedData(request.headers);
    if (!session.userId) {
      throw new UnauthorizedException();
    }

    return session;
  }
}
