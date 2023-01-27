import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  IVerification,
  NotificationEvent,
  NotificationTransport,
  NOTIFICATION_SERVICE,
  VERIFICATION_CODE_TTL,
  VERIFICATION_KEY,
  VERIFIED_CODE_SESSION_TTL,
} from '@taskapp/shared';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';
import { authenticator } from 'otplib';
import { Account } from '../accounts/entities';
import { CreateVerificationDto } from './dto';

@Injectable()
export class VerificationsService {
  secret: string;

  constructor(
    @InjectRepository(Account)
    private accountRepository: EntityRepository<Account>,
    @Inject(NOTIFICATION_SERVICE) private notificationsService: ClientProxy,
    private readonly redisService: RedisService,
    @InjectPinoLogger(VerificationsService.name)
    private readonly logger: PinoLogger,
  ) {
    this.secret = authenticator.generateSecret();
  }

  async create({ email, isExists }: CreateVerificationDto) {
    if (isExists) {
      const data = await this.accountRepository.findOne({ email });

      if (isExists && !data) {
        throw new NotFoundException({
          errors: [{ message: 'Email not in use', field: 'email' }],
        });
      }

      if (!isExists && !!data) {
        throw new ConflictException({
          errors: [{ message: 'Email already in use', field: 'email' }],
        });
      }
    }

    try {
      const code = authenticator.generate(this.secret);
      const key = `${VERIFICATION_KEY}:${code}`;
      const endsAt = new Date(Date.now() + VERIFICATION_CODE_TTL);
      const data = { email, endsAt, isVerified: false };
      const cache = this.redisService.getClient();
      await cache.hmset(key, { email, isVerified: false });
      await cache.persistAt(key, endsAt);

      this.notificationsService.emit(
        'email',
        new NotificationEvent({ body: code }, NotificationTransport.EMAIL),
      );

      return { data };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async confirm(code: string) {
    const cache = this.redisService.getClient();
    const key = `${VERIFICATION_KEY}:${code}`;
    const confirmation: IVerification = await cache.hgetall(key);

    if (!confirmation || confirmation.isVerified) {
      throw new NotFoundException();
    }

    try {
      const endsAt = new Date(Date.now() + VERIFIED_CODE_SESSION_TTL);
      const data = { email: confirmation.email, endsAt, isVerified: false };
      await cache.hmset(key, { isVerified: true });
      await cache.persistAt(key, endsAt);

      return { data };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}
