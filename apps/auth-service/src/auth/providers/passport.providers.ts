import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { IAccount } from '@taskapp/shared';
import type { Request } from 'express';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import jwt from 'passport-jwt';
import local from 'passport-local';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(local.Strategy) {
  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(LocalStrategy.name)
    private readonly logger: PinoLogger,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    const params = { password, email };
    const { data } = await firstValueFrom(
      this.httpService
        .get<IAccount>('http://user-service/accounts', { params })
        .pipe(
          catchError((err) => {
            this.logger.error(err);
            throw new InternalServerErrorException();
          }),
        ),
    );

    if (!data) throw new UnauthorizedException();
    return data;
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
