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

@Injectable()
export class WorkspaceService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    @Inject(SEARCH_SERVICE) private searchService: ClientProxy,
    @InjectPinoLogger(WorkspaceService.name)
    private readonly logger: PinoLogger,
  ) {}

  async proxy<T, D>(url: string, dto: D) {
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

  async create() {
    try {
    } catch (e) {
      throw new PreconditionFailedException();
    }
  }
}
