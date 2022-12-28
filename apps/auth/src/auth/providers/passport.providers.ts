import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import jwt from 'passport-jwt';
import local from 'passport-local';

import { UsersService } from 'src/users/users/users.service';
import { AuthService } from '../auth.service';
import { Auth } from '../types/auth.type';

@Injectable()
export class LocalStrategy extends PassportStrategy(local.Strategy) {
  constructor(private userService: UsersService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const params = { password, email };
    const user = await this.userService.findValidatedOne(params);

    if (!user) throw new UnauthorizedException();
    return user;
  }
}

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
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: Auth) {
    if (this.authService.isBlocked(payload.id)) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  jwt.Strategy,
  'jwt-refresh-token',
) {
  constructor(configService: ConfigService, private userService: UsersService) {
    super({
      jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req: Request) => req?.cookies?.Refresh,
      ]),
      secretOrKey: configService.get('SECRET'),
    });
  }

  async validate(payload: Auth) {
    return this.userService.findOne(payload.id);
  }
}

export default [LocalStrategy, JwtStrategy];
