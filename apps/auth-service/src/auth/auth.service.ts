import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  IAuth,
  IHydratedAccount,
  IHydratedMember,
  IPaginatedResponse,
  IResponse,
} from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';
import { catchError, firstValueFrom, map } from 'rxjs';
import { CreateAuthDto, TfaAuthDto } from './dto';

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

  public isBlocked(userId: IAuth['userId']) {
    return this.redisService.getClient().zscore('BLACKLIST', `${userId}`);
  }

  public async getAuth(dto: CreateAuthDto): Promise<IAuth> {
    return firstValueFrom(
      this.httpService
        .get<IResponse<IHydratedAccount>>(
          `http://accounts-service/account/auth`,
          { params: dto },
        )
        .pipe(
          map(({ data }) => {
            const { id: userId, isTfaEnabled: needTfa } = data.data;
            return { userId, needTfa, permissions: null };
          }),
          catchError((err): never => {
            if (err.status > 499) this.logger.error(err);
            throw new HttpException(err.data, err.status);
          }),
        ),
    );
  }

  public async checkTfaAuth(dto: TfaAuthDto) {
    return firstValueFrom(
      this.httpService
        .get<IResponse<boolean>>(`http://accounts-service/account/2fa/auth`, {
          params: dto,
        })
        .pipe(
          map(({ data }) => data.data),
          catchError((err): never => {
            if (err.status > 499) this.logger.error(err);
            throw new HttpException(err.data, err.status);
          }),
        ),
    );
  }

  public async getPermissions(
    userId: IAuth['userId'],
  ): Promise<IAuth['permissions']> {
    return firstValueFrom(
      this.httpService
        .get<IPaginatedResponse<IHydratedMember>>(
          'http://member-query-service/members',
          {
            params: { accountId: userId },
            headers: { 'x-user-id': userId },
          },
        )
        .pipe(
          catchError((err) => {
            if (err.status > 499) this.logger.error(err);
            throw new HttpException(err.data, err.status);
          }),
          map(({ data }) =>
            data.data.items.reduce(
              (all, c) => ({ ...all, [c.role.projectId]: c.role.permissions }),
              {},
            ),
          ),
        ),
    );
  }

  public createAccessCookie(auth: IAuth) {
    const LIFESPAN = this.configService.get('AUTH_ACCESS_TOKEN_LIFESPAN');
    const token = this.jwtService.sign(auth, {
      secret: this.configService.get('SECRET'),
      expiresIn: LIFESPAN,
    });

    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${LIFESPAN}`;
  }

  public createRefreshCookie(userId: IAuth['userId']) {
    const payload = { userId };
    const LIFESPAN = this.configService.get('AUTH_REFRESH_TOKEN_LIFESPAN');
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET'),
      expiresIn: LIFESPAN,
    });

    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${LIFESPAN}`;
  }
}
