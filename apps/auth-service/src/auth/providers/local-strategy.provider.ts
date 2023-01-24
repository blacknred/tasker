import { HttpService } from '@nestjs/axios';
import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IAccount, IAuthExtended, ITeammate } from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import local from 'passport-local';
import { catchError, firstValueFrom } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(local.Strategy) {
  constructor(
    private authService: AuthService,
    @InjectPinoLogger(LocalStrategy.name)
    private readonly logger: PinoLogger,
  ) {
    super();
  }

  async validate(email: string, password: string): Promise<IAuthExtended> {
    const account = this.authService.findAccount();
    

    const params = { password, email };
    const { data: account } = await firstValueFrom(
      this.httpService
        .get<IAccount>('http://user-service/accounts', { params })
        .pipe(
          catchError((err) => {
            this.logger.error(err);
            throw new InternalServerErrorException();
          }),
        ),
    );

    const config = { params: { accountId: account.id }, headers: { 'x-user-id'}};
    const { data: teammates } = await firstValueFrom(
      this.httpService
        .get<ITeammate>('http://member-query-service/teammates', config)
        .pipe(
          catchError((err) => {
            this.logger.error(err);
            throw new InternalServerErrorException();
          }),
        ),
    );

    const data: I = 


    

    if (!data) throw new UnauthorizedException();
    return data;
  }
}
