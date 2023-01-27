import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAuth } from '@taskapp/shared';
import type { Request } from 'express';
import jwt from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(jwt.Strategy) {
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(auth: IAuth) {
    if (auth.needTFA) {
      throw new UnauthorizedException();
    }

    if (this.authService.isBlocked(auth.userId)) {
      throw new UnauthorizedException();
    }

    return auth;
  }
}
