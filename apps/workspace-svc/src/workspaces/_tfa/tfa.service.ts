import { EntityRepository, wrap, orm } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  CONFIRMATION_KEY,
  IAccount,
  IConfirmationCode,
  IInvitation,
  NOTIFICATION_SERVICE,
} from '@taskapp/shared';
import * as bcrypt from 'bcryptjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';
import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';
import {
  CreateAccountDto,
  GetValidatedAccountDto,
  UpdateAccountDto,
} from './dto';
import { Account } from '../_accounts/entities';

@Injectable()
export class TfaService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: EntityRepository<Account>,
    @Inject(NOTIFICATION_SERVICE) private notificationService: ClientProxy,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectPinoLogger(TfaService.name)
    private readonly logger: PinoLogger,
  ) {}

  async get2faSecretCode(id: IAccount['id']) {
    const secret = authenticator.generateSecret();

    const app = this.configService.get('APP_NAME');
    const { tfaSecret } = await this.accountRepository.findOne(id, {
      populate: ['tfaSecret'],
    });

    const otpAuthUrl = authenticator.keyuri(id, app, tfaSecret);
    return toDataURL(otpAuthUrl);
  }

  async create({ emailCode, inviteToken, ...dto }: CreateAccountDto) {
    let email, projectId, roleId;

    if (inviteToken) {
      // check token
      const secret = this.configService.get('SECRET');
      let invitation: IInvitation;

      try {
        invitation = await this.jwtService.verifyAsync<IInvitation>(
          inviteToken,
          { secret },
        );
      } catch (err) {}

      if (!invitation?.email) {
        throw new BadRequestException({
          errors: [
            { message: 'Invalid or expired token', field: 'inviteToken' },
          ],
        });
      }

      email = invitation.email;
      projectId = invitation.projectId;
      roleId = invitation.roleId;
    } else {
      // check code
      const cache = this.redisService.getClient();
      const key = `${CONFIRMATION_KEY}:${emailCode}`;
      const confirmation: IConfirmationCode = await cache.get(key);

      if (!confirmation?.isConfirmed || !confirmation?.email) {
        throw new BadRequestException({
          errors: [{ message: 'Invalid or expired code', field: 'emailCode' }],
        });
      }

      email = confirmation.email;
    }

    const account = await this.accountRepository.findOne({ email });

    if (account) {
      throw new ConflictException({
        errors: [{ message: 'Email already in use', field: 'email' }],
      });
    }

    try {
      // account
      const data = new Account({ ...dto, email });
      await this.accountRepository.nativeInsert(data);

      // project membership
      if (projectId && roleId) {
        //
      }

      return { data };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async findOne(id: IAccount['id']) {
    const data = await this.accountRepository.findOne(id);

    if (!data) {
      throw new NotFoundException();
    }

    return { data };
  }

  async findOneWithCredentials({ email, password }: GetValidatedAccountDto) {
    try {
      const data = await this.accountRepository.findOne({ email });

      if (!data) {
        throw new NotFoundException({
          errors: [{ message: 'Email not in use', field: 'email' }],
        });
      }

      if (!bcrypt.compareSync(password, data.password)) {
        throw new UnauthorizedException({
          errors: [{ message: 'Wrong password', field: 'password' }],
        });
      }

      data.deletedAt = undefined;
      this.accountRepository.flush();

      return { data };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }

  async update(id: IAccount['id'], { emailCode, ...dto }: UpdateAccountDto) {
    const { data } = await this.findOne(id);

    if (emailCode) {
      // check code
      const cache = this.redisService.getClient();
      const key = `${CONFIRMATION_KEY}:${emailCode}`;
      const confirmation: IConfirmationCode = await cache.get(key);

      if (!confirmation?.isConfirmed || !confirmation?.email) {
        throw new BadRequestException({
          errors: [{ message: 'Invalid or expired code', field: 'emailCode' }],
        });
      }

      data.email = confirmation.email;
    }

    try {
      wrap(data).assign(dto);

      if (dto.password) {
        await data.hashPassword();
      }

      await this.accountRepository.persistAndFlush(data);

      return { data };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }

  async delete(id: IAccount['id']) {
    try {
      const account = await this.accountRepository.findOne(id);

      account.tfaSecret = null;
      account.tfaReserveCode = null;
      account.isTfaEnabled = false;

      await this.accountRepository.removeAndFlush(account);

      return { data: null };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }
}

// post secret,enabled=false,reserve
// get  true
// patch enabled=true
// delete secret=NULL,enabled=false,reserve=NULL

// if (!valid) {
//   throw new UnauthorizedException({
//     errors: [{ message: 'Invalid or expired totp', field: 'totp' }],
//   });
// }

// create(2fa) -> ResponseDto<secret_qr_string>
// get(2fa/auth) -> ResponseDto<boolean>
// patch() -> ResponseDto<reserve_code_string>
