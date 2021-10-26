import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
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
    const { status, ...rest } = await this.userService
      .send<IResponse<IUser>>('getOneValidated', {
        password,
        email,
      })
      .toPromise();

    if (status !== HttpStatus.OK) {
      throw new HttpException(rest, status);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...user } = rest.data;
    return user;
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(
    user: Partial<IUser>,
    done: (err: Error, payload: IAuth) => void,
  ) {
    done(null, { user, pushSubscriptions: [] });
  }

  deserializeUser(payload: IAuth, done: (err: Error, user: IAuth) => void) {
    done(null, payload);
  }
}

export default [LocalStrategy, SessionSerializer];
