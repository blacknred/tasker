import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { SharedService } from 'src/__shared__/shared.service';
import { USER_SERVICE } from 'src/users/consts';
import { IUser } from '../../users/interfaces/user.interface';
import { IAuth } from '../interfaces/auth.interface';

// LocalAuthGuard.logIn(req) => LocalStrategy.validate() => SessionSerialiser.serializeUser()

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: SharedService,
    @Inject(USER_SERVICE) protected readonly client: ClientProxy,
  ) {
    super({ usernameField: 'email' });
    this.usersService.proxy = client;
  }

  async validate(email: string, password: string) {
    const { data } = await this.usersService.feed<IUser>('getOneValidated', {
      password,
      email,
    });

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
