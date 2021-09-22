import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportSerializer, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
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
    try {
      const payload = { email, password };
      const user = await this.userService.feed<UserResponseDto>(
        'findAll',
        payload,
      );
      if (!user) throw new Error();
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class SessionSerializer extends PassportSerializer {
  // constructor(private readonly usersService: UsersService) {
  //   super();
  // }

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
    // const user = this.usersService.findOne(payload.id);
    done(null, payload);
  }
}

export default [LocalStrategy, SessionSerializer];
