import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { UsersService } from '../../users/users.service';
import { IUser } from '../../users/interfaces/user.interface';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  // mapping session object after calling validate method in local-strategy
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
