import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
    @InjectPinoLogger(AuthService.name)
    private readonly logger: PinoLogger,
  ) {}

  public async isBlocked(id: number) {
    return this.redisService.getClient('users').zscore('BLACKLIST', `${id}`);
  }

  public createAccessCookie(id: number) {
    const payload = { id };
    const LIFESPAN = this.configService.get('AUTH_ACCESS_TOKEN_LIFESPAN');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: LIFESPAN,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${LIFESPAN}`;
  }

  public createRefreshCookie(id: number) {
    const payload = { id };
    const LIFESPAN = this.configService.get('AUTH_REFRESH_TOKEN_LIFESPAN');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: LIFESPAN,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${LIFESPAN}`;
  }

  public remove() {
    return [
      'Authentication=; HttpOnly; Path=/; Max-Age=0',
      'Refresh=; HttpOnly; Path=/; Max-Age=0',
    ];
  }
}
