import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE, SEARCH_SERVICE } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { catchError, firstValueFrom, map, timeout } from 'rxjs';
import { UserResponseDto, UsersResponseDto } from './dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @Inject(SEARCH_SERVICE) private searchService: ClientProxy,
    @InjectPinoLogger(UsersService.name)
    private readonly logger: PinoLogger,
  ) {}

  async proxy<T, D>(url: string, dto: D) {
    // https://www.npmjs.com/package/@keycloak/keycloak-admin-client
    return firstValueFrom(
      this.httpService.get<T>(url, { params: dto }).pipe(
        timeout(this.configService.get('HTTP_TIMEOUT')),
        map((data) => {
          // const { id: userId, isTfaEnabled: needTfa } = data.data;
          // return { userId, needTfa, permissions: null };
          //   map<ResponseDto<T>, any>(({ status, ...payload }) => {
          //     // return zip(...reqs).pipe(map((resps) => ({ ...resps })));
          //     if (status !== HttpStatus.OK && status !== HttpStatus.CREATED && status !== HttpStatus.NO_CONTENT) {
          //       throw new HttpException(payload, status);
          //     }
        }),
        catchError((err): never => {
          if (err.status > 499) this.logger.error(err);
          throw new HttpException(err.data, err.status);
        }),
      ),
    );
  }

  async create(id, dto, userId) {
    try {
      return {} as UserResponseDto;
    } catch (e) {
      throw new PreconditionFailedException();
    }
  }

  async findAll(id, dto, userId) {
    return {} as UsersResponseDto;
  }

  async findOne(id, pid, userId) {
    return {} as UserResponseDto;
  }

  async update(id, pid, dto, userId) {
    return {} as UserResponseDto;
  }

  async delete(id, pid, userId) {
    return id;
  }
}
