import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AppService } from 'src/app.service';
import { USER_SERVICE } from 'src/users/consts';
import { IUser } from '../../users/interfaces/user.interface';
import { IAuthData } from '../interfaces/authed-request.interface';

// LocalAuthGuard.logIn(req) => LocalStrategy.validate() => SessionSerialiser.serializeUser()

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AppService,
    @Inject(USER_SERVICE) protected readonly client: ClientProxy,
  ) {
    super({ usernameField: 'email' });
    this.authService.proxy = client;
  }

  async validate(email: string, password: string) {
    const { data } = await this.authService.feed<IAuthData>('getValidatedOne', {
      password,
      email,
    });

    return data;
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    { id, roles }: IUser,
    done: (err: Error, user: IAuthData) => void,
  ) {
    done(null, { id, roles });
  }

  deserializeUser(
    payload: IAuthData,
    done: (err: Error, user: IAuthData) => void,
  ) {
    done(null, payload);
  }
}

export default [LocalStrategy, SessionSerializer];
