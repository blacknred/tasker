import { v4 } from 'uuid';
import {
  forwardRef,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UsersService } from 'src/users/users.service';
import { CACHE_SERVICE, DAY_TTL, NOTIFICATION_SERVICE } from './consts';
import { CreateTokenDto } from './dto/create-token.dto';
import { RedisAdapter } from './utils/redis.adapter';
import { IToken } from './interfaces/token.interface';
import { GetTokensDto } from './dto/get-tokens.dto';
import { ResponseDto } from 'src/__shared__/dto/response.dto';

@Injectable()
export class TokensService {
  private readonly logger = new Logger(TokensService.name);

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    @Inject(CACHE_SERVICE) private readonly cacheService: RedisAdapter,
    @Inject(NOTIFICATION_SERVICE) private notificationService: ClientProxy,
  ) {}

  async create(createTokenDto: CreateTokenDto) {
    try {
      const { email, exist, link, dtl = 1, wid, uid } = createTokenDto;

      // if email in use
      const res = await this.usersService.findAll({ limit: 1, email });
      const found = res.data.items[0];

      if (found && !exist) {
        return {
          status: HttpStatus.CONFLICT,
          errors: [{ message: 'Email already in use', field: 'email' }],
        };
      }

      if (!found && exist) {
        return {
          status: HttpStatus.CONFLICT,
          errors: [{ message: 'Email not in use', field: 'email' }],
        };
      }

      // create token
      // TODO: check if token with this email allready exists
      const token = v4();
      const payload: IToken = { email, wid, uid, createdAt: new Date() };
      await this.cacheService.setAsync(token, payload, 'ex', DAY_TTL * dtl);

      // send link to email
      const emailLink = `${link}?token=${token}&email=${email}`;
      this.notificationService.emit('email', { data: emailLink });

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

  async findAll(getTokensDto: GetTokensDto) {
    this.logger.log(getTokensDto);
    // TODO: ...
    return {
      status: HttpStatus.OK,
      data: null,
    };
  }

  async findOne(token: string) {
    const data: IToken = await this.cacheService.getAsync(token);

    if (!data) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data,
    };
  }

  async remove(token: string) {
    try {
      const res = await this.findOne(token);
      if (!res.data) return res as ResponseDto;

      await this.cacheService.delAsync(token);

      return {
        status: HttpStatus.OK,
        data: null,
      };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}
