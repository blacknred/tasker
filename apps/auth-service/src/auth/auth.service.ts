import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  IAuth,
  IAuthExtended,
  ID,
  IHydratedAccount,
  IHydratedMember,
  IPaginatedResponse,
  IResponse,
} from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';
import { catchError, firstValueFrom, map } from 'rxjs';
import { CreateAuthDto } from './dto';

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

  public isBlocked(userId: ID) {
    return this.redisService.getClient().zscore('BLACKLIST', `${userId}`);
  }

  public async getProfile(
    id?: ID,
    dto?: CreateAuthDto,
  ): Promise<IAuthExtended> {
    return firstValueFrom(
      this.httpService
        .get<IResponse<IHydratedAccount>>(
          `http://accounts-service/account/${id ?? ''}`,
          { params: dto },
        )
        .pipe(
          catchError((err): never => {
            if (err.status > 500) {
              this.logger.error(err);
            }

            throw new HttpException(err.data, err.status);
          }),
          map(({ data: { data } }) => ({
            userId: data.id,
            name: data.name,
            image: data.image,
            locale: data.locale,
            vapidPublicKey: this.configService.get('VAPID_PUBLIC_KEY'),
            permissions: null,
          })),
        ),
    );
  }

  public async getPermissions(userId: ID): Promise<IAuth['permissions']> {
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
            this.logger.error(err);
            throw new InternalServerErrorException();
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

    return `Refresh=${token}; HttpOnly; Path=/; Max-Age=${LIFESPAN}`;
  }
}
