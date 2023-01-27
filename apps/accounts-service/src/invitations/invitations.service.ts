import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AuthHeaders,
  IAuth,
  IHydratedRole,
  INVITATION_TTL,
  IResponse,
  NotificationEvent,
  NotificationTransport,
  NOTIFICATION_SERVICE,
} from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateInvitationDto } from './dto';

@Injectable()
export class InvitationsService {
  constructor(
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    private readonly httpService: HttpService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectPinoLogger(InvitationsService.name)
    private readonly logger: PinoLogger,
  ) {}

  async create({ signupPath, ...dto }: CreateInvitationDto, auth: IAuth) {
    await firstValueFrom(
      this.httpService
        .get<IResponse<IHydratedRole>>(
          `http://member-query-service/roles/${dto.roleId}`,
          {
            params: { projectId: dto.projectId },
            headers: AuthHeaders.getSerializedHeaders(auth),
          },
        )
        .pipe(
          catchError((err) => {
            if (err.status > 500) {
              this.logger.error(err);
            }
            throw new HttpException(err.response.data, err.status);
          }),
        ),
    );

    try {
      const exp = Math.floor(Date.now() / 1000) + INVITATION_TTL;
      const secret = this.configService.get('SECRET');
      const token = this.jwtService.sign({ ...dto, exp }, { secret });
      const data = { ...dto, endsAt: new Date(exp) };
      const link = `${signupPath}?token=${token}&email=${dto.email}`;

      this.notificationsService.emit(
        'email',
        new NotificationEvent({ body: link }, NotificationTransport.EMAIL),
      );

      return { data };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}
