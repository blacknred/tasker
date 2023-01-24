import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAuth } from '@taskapp/shared';
import type { Request } from 'express';
import jwt from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  jwt.Strategy,
  'jwt-refresh-token',
) {
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.Refresh,
      ]),
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: Pick<IAuth, 'userId'>) {
    // return this.userService.findOne(payload.userId);
  }
}
