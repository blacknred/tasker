import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
  PreconditionFailedException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';
import {
  IAccount,
  IInvitation,
  IVerification,
  VERIFICATION_KEY,
} from '@taskapp/shared';
import * as bcrypt from 'bcryptjs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { RedisService } from 'nestjs-redis';
import {
  CreateAccountDto,
  GetValidatedAccountDto,
  RestoreAccountDto,
  UpdateAccountDto,
} from './dto';
import { Account } from './entities';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: EntityRepository<Account>,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectPinoLogger(AccountsService.name)
    private readonly logger: PinoLogger,
  ) {}

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
      const key = `${VERIFICATION_KEY}:${emailCode}`;
      const verification: IVerification = await cache.get(key);

      if (!verification?.isVerified || !verification?.email) {
        throw new BadRequestException({
          errors: [{ message: 'Invalid or expired code', field: 'emailCode' }],
        });
      }

      email = verification.email;
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
      const key = `${VERIFICATION_KEY}:${emailCode}`;
      const verification: IVerification = await cache.get(key);

      if (!verification?.isVerified || !verification?.email) {
        throw new BadRequestException({
          errors: [{ message: 'Invalid or expired code', field: 'emailCode' }],
        });
      }

      data.email = verification.email;
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
    const { data } = await this.findOne(id);

    try {
      data.deletedAt = new Date();

      return { data: null };
    } catch (err) {
      this.logger.error(err);
      throw new PreconditionFailedException();
    }
  }

  async restore({ emailCode, password }: RestoreAccountDto) {
    // check code
    const cache = this.redisService.getClient();
    const key = `${VERIFICATION_KEY}:${emailCode}`;
    const verification: IVerification = await cache.get(key);

    if (!verification || !verification.isVerified) {
      throw new BadRequestException({
        errors: [{ message: 'Invalid or expired code', field: 'emailCode' }],
      });
    }

    // check email
    const account = await this.accountRepository.findOne({
      email: verification.email,
    });

    if (!account) {
      throw new ConflictException({
        errors: [{ message: 'Email not in use', field: 'emailCode' }],
      });
    }

    try {
      wrap(account).assign({ password });
      await account.hashPassword();
      await this.accountRepository.persistAndFlush(account);

      return { data: null };
    } catch (e) {
      throw new RpcException({
        status: HttpStatus.PRECONDITION_FAILED,
      });
    }
  }
}
