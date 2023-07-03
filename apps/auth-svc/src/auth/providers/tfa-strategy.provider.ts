import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAuth } from '@taskapp/shared';
import type { Request } from 'express';
import jwt from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtTfaStrategy extends PassportStrategy(jwt.Strategy, 'jwt-tfa') {
  constructor(configService: ConfigService, private authService: AuthService) {
    super({
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.Authentication,
      ]),
      secretOrKey: configService.get('SECRET'),
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  async validate({ body }: Request, auth: IAuth): Promise<IAuth> {
    await this.authService.checkTfaAuth(body);

    auth.needTfa = false;
    return auth;
  }
}
