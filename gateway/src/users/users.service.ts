import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from 'src/app.service';
import { USER_SERVICE } from './consts';

@Injectable()
export class UsersService extends AppService {
  constructor(
    @Inject(USER_SERVICE) private readonly usersService: ClientProxy,
  ) {
    super();
    super.proxy = usersService;
  }
}
