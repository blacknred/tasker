import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { USER_REPOSITORY } from './consts';
import { CreateUserDto } from './dto/create-user.dto';
import { GetValidatedUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const emailInUse = await this.userRepository.findOne({
        email: createUserDto.email,
      });

      if (emailInUse) {
        return {
          status: HttpStatus.CONFLICT,
          errors: [
            {
              message: 'Email already in use',
              field: 'email',
            },
          ],
        };
      }

      // const salt = this.configService.get('SECRET');
      const user = new User();
      Object.assign(user, createUserDto);
      await this.userRepository.save(user);
      user.password = undefined;

      return {
        status: HttpStatus.CREATED,
        data: user,
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.message],
      };
    }
  }

  async findAll({ limit, cursor, ...filters }: GetUsersDto) {
    console.log(limit, cursor);

    const lim = Math.min(50, limit);
    const extraLim = lim + 1;
    const cur = cursor ? new Date(+cursor) : new Date();

    const users = await this.userRepository
      .createQueryBuilder('p')
      .where(filters)
      .andWhere('p.createdAt < :cur', { cur })
      .limit(extraLim)
      .getMany();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = users.slice(0, lim).map(({ password, ...rest }) => rest);

    return {
      hasMore: users.length === extraLim,
      status: HttpStatus.OK,
      data,
    };
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    user.password = undefined;

    if (!user) {
      return {
        status: HttpStatus.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: HttpStatus.OK,
      data: user,
    };
  }

  async findOneValidated({ email, password }: GetValidatedUserDto) {
    try {
      const user = await this.userRepository.findOne({ email });

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          errors: [
            {
              field: 'email',
              message: 'Email not in use',
            },
          ],
        };
      }

      if (!bcrypt.compareSync(password, user.password)) {
        return {
          status: HttpStatus.UNAUTHORIZED,
          errors: [
            {
              field: 'password',
              message: 'Wrong password',
            },
          ],
        };
      }

      return {
        status: HttpStatus.OK,
        data: user,
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.message],
      };
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOne(id);

      if (!user) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: null,
        };
      }

      const updatedUser = Object.assign(user, updateUserDto) as User;
      await this.userRepository.save(updatedUser);

      return {
        status: HttpStatus.OK,
        data: updatedUser,
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.message],
      };
    }
  }

  async remove(id: number) {
    try {
      if (!(await this.userRepository.findOne(id))) {
        return {
          status: HttpStatus.NOT_FOUND,
          data: null,
        };
      }

      await this.userRepository.delete(id);

      return {
        status: HttpStatus.OK,
        data: null,
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        errors: [e.message],
      };
    }
  }
}
