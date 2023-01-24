import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { IAuth, ID } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService,
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
  ) {}

  public readonly emptyCookie = [
    'Authentication=; HttpOnly; Path=/; Max-Age=0',
    'Refresh=; HttpOnly; Path=/; Max-Age=0',
  ];

  public serializePermissions(permissions: IAuth['permissions']) {
    // "uuid-1234,uuid-24"
    return Object.entries(permissions)
      .map(([k, v]) => `${k}-${v.join()}`)
      .join(',');
  }

  public async isBlocked(id: ID) {
    return this.redisService.getClient().zscore('BLACKLIST', `${id}`);
  }

  public createAccessCookie({ userId, permissions }: IAuth) {
    const payload = { userId, permissions };
    const LIFESPAN = this.configService.get('AUTH_ACCESS_TOKEN_LIFESPAN');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: LIFESPAN,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${LIFESPAN}`;
  }

  public createRefreshCookie({ userId }: IAuth) {
    const payload = { userId };
    const LIFESPAN = this.configService.get('AUTH_REFRESH_TOKEN_LIFESPAN');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: LIFESPAN,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${LIFESPAN}`;
  }
}
