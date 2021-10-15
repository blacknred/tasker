import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { USER_SERVICE } from 'src/users/consts';
import { IUser } from '../../users/interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';
import { IResponse } from 'src/__shared__/interfaces/response.interface';

// LocalAuthGuard.logIn(req) => LocalStrategy.validate() => SessionSerialiser.serializeUser()

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(USER_SERVICE) protected readonly userService: ClientProxy,
  ) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const { data } = await this.userService
      .send<IResponse<IUser>>('getOneValidated', {
        password,
        email,
      })
      .toPromise();

    return data;
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    { id, roles, email }: IUser,
    done: (err: Error, user: IAuth) => void,
  ) {
    done(null, { id, roles, email, pushSubscriptions: [] });
  }

  deserializeUser(payload: IAuth, done: (err: Error, user: IAuth) => void) {
    done(null, payload);
  }
}

export default [LocalStrategy, SessionSerializer];
