import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from '../../users/users.service';
import { IUser } from '../../users/interfaces/user.interface';

// LocalAuthGuard.logIn(req) => LocalStrategy.validate() => SessionSerialiser.serializeUser()

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    return this.authService.create({ email, password });
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(
    user: IUser,
    done: (err: Error, user: { id: number; role: string }) => void,
  ) {
    done(null, { id: user.id, role: user.role });
  }

  deserializeUser(
    payload: { id: number; role: string },
    done: (err: Error, user: Omit<IUser, 'password'>) => void,
  ) {
    const user = this.usersService.findOne(payload.id);
    done(null, user);
  }
}

export default [LocalStrategy, SessionSerializer];
