import { Injectable } from '@nestjs/common';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';
import { IUser } from '../../users/interfaces/user.interface';
import { IAuthData } from '../interfaces/authed-request.interface';

// LocalAuthGuard.logIn(req) => LocalStrategy.validate() => SessionSerialiser.serializeUser()

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const { data } = await this.userService.feed<IAuthData>('getValidatedOne', {
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
