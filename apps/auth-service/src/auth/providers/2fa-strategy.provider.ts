import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAuth } from '@taskapp/shared';
import type { Request } from 'express';
import jwt from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtTFAStrategy extends PassportStrategy(jwt.Strategy, 'jwt-2fa') {
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
    const valid = await this.authService.validateTFA(body);
    if (!valid) {
      throw new UnauthorizedException({
        errors: [{ message: 'Invalid or expired totp', field: 'totp' }],
      });
    }

    auth.needTFA = false;
    return auth;
  }
}
