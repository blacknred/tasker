import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import * as consts from './consts';

@Injectable()
export class UsersService extends AppService {
  constructor(
    @Inject(consts.userService) private readonly usersService: ClientProxy,
  ) {
    super(usersService);
  }
}
