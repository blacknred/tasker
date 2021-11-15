import { v4 } from 'uuid';
import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UsersService } from 'src/users/users.service';
import { CACHE_SERVICE, NOTIFICATION_SERVICE } from './consts';
import { CreateTokenDto } from './dto/create-token.dto';
import { RedisAdapter } from './utils/redis.adapter';

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);

  constructor(
    private readonly usersService: UsersService,
    @Inject(CACHE_SERVICE) private readonly cacheService: RedisAdapter,
    @Inject(NOTIFICATION_SERVICE) private notificationService: ClientProxy,
  ) {}

  async parse(token: string) {
    const data = await this.cacheService.getAsync(token);
    if (!data) {
      return {
        status: HttpStatus.BAD_REQUEST,
        errors: [{ message: 'Invalid or expired token', field: 'emailToken' }],
      };
    }

    await this.cacheService.delAsync(token);
    return {
      status: HttpStatus.OK,
      data,
    };
  }

  async create({ email, exist, link, period, wid }: CreateTokenDto) {
    try {
      // if email in use
      const res = await this.usersService.findAll({ limit: 1, email });
      const found = res.data.items[0];

      let error;
      if (found && !exist) error = 'Email already in use'; // User allready exists
      if (!found && exist) error = 'Email not in use';
      if (error) {
        return {
          status: HttpStatus.CONFLICT,
          errors: [{ message: error, field: 'email' }],
        };
      }

      const token = v4();
      // TODO: check if token with this email allready exists
      await this.cacheService.setAsync(token, email, 'ex', CACHE_TTL);
      const emailLink = `${link}?token=${token}&email=${email}`;
      this.logger.log(emailLink);
      // TODO: SEND link with email

      return {
        status: HttpStatus.CREATED,
        data: null,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}



