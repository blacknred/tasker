import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { GetUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import {
  ResponseDto,
  UserResponseDto,
  UsersResponseDto,
} from './dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

jest.mock('bcryptjs');

const mockCreateUserDto = {
  name: 'testname',
  email: 'test@email.com',
  password: 'testpassword',
};

const mockUser = {
  ...new User(mockCreateUserDto),
  id: 1,
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;
  let bcryptCompare: jest.Mock;
  let findUser: jest.Mock;

  beforeEach(async () => {
    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compareSync as jest.Mock) = bcryptCompare;
    findUser = jest.fn().mockResolvedValue(mockUser);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: () => ({
            findAndCount: jest.fn().mockResolvedValue([[mockUser], 2]),
            save: jest.fn().mockReturnValue(mockUser),
            create: jest.fn().mockReturnValue(mockUser),
            update: jest.fn().mockResolvedValue(null),
            delete: jest.fn().mockResolvedValue(null),
            findOne: findUser,
          }),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('When creating one', () => {
    describe('if email allready in use', () => {
      it('should return an error', async () => {
        await expect(service.create(mockCreateUserDto)).resolves.toEqual({
          status: HttpStatus.CONFLICT,
          errors: [
            {
              message: 'Email already in use',
              field: 'email',
            },
          ],
        });
      });
    });

    describe('if email not in use', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(null);
      });
      it('should save an user in the database', async () => {
        await expect(service.create(mockCreateUserDto)).resolves.toEqual({
          status: HttpStatus.CREATED,
          data: mockUser,
        });

        expect(repository.findOne).toHaveBeenCalled();
        expect(repository.create).toHaveBeenCalled();
        expect(repository.create).toBeCalledWith(mockCreateUserDto);
        expect(repository.save).toBeCalledTimes(1);
      });
    });
  });

  describe('When getting all', () => {
    it('should return an array of users by params', async () => {
      const params: GetUsersDto = { limit: 5, offset: 1 };
      await expect(service.findAll(params)).resolves.toEqual<UsersResponseDto>({
        status: HttpStatus.OK,
        data: {
          items: [mockUser],
          hasMore: false,
          total: 2,
        },
      });

      expect(repository.findAndCount).toHaveBeenCalled();
      expect(repository.findAndCount).toBeCalledWith({
        order: { id: 'ASC' },
        skip: 1,
        take: 6,
        where: {},
      });
    });
  });

  describe('When getting one', () => {
    describe('non existing', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(null);
      });
      it('return an error', () => {
        expect(service.findOne(9)).resolves.toEqual<UserResponseDto>({
          status: HttpStatus.NOT_FOUND,
          data: null,
        });
      });
    });

    describe('existing', () => {
      it('should return an user', () => {
        expect(service.findOne(1)).resolves.toEqual<UserResponseDto>({
          status: HttpStatus.OK,
          data: mockUser,
        });

        expect(repository.findOne).toHaveBeenCalled();
        expect(repository.findOne).toBeCalledWith(1);
      });
    });
  });

  describe('When getting validated one with validation', () => {
    const params: GetUserDto = {
      ...mockCreateUserDto,
    };

    describe('if email is not in use', () => {
      beforeEach(() => {
        findUser.mockResolvedValue(null);
      });
      it('should return an error', async () => {
        await expect(
          service.findOneValidated(params),
        ).resolves.toEqual<UserResponseDto>({
          status: HttpStatus.NOT_FOUND,
          errors: [
            {
              field: 'email',
              message: 'Email not in use',
            },
          ],
        });
      });
    });

    describe('if password is not valid', () => {
      beforeEach(() => {
        bcryptCompare.mockReturnValue(false);
      });
      it('should return an error', async () => {
        await expect(
          service.findOneValidated(params),
        ).resolves.toEqual<UserResponseDto>({
          status: HttpStatus.UNAUTHORIZED,
          errors: [
            {
              field: 'password',
              message: 'Wrong password',
            },
          ],
        });
      });
    });

    describe('if validated', () => {
      it('should return an user', async () => {
        await expect(
          service.findOneValidated(params),
        ).resolves.toEqual<UserResponseDto>({
          status: HttpStatus.OK,
          data: mockUser,
        });
      });
    });
  });

  describe('When updating one', () => {
    it('should update existing user in database', async () => {
      const params: UpdateUserDto = { id: 1, name: 'supertestname' };
      await expect(service.update(params)).resolves.toEqual<UserResponseDto>({
        status: HttpStatus.OK,
        data: {
          ...mockUser,
          name: 'supertestname',
        },
      });

      expect(repository.update).toHaveBeenCalled();
      expect(repository.update).toBeCalledWith(1, params);
    });
  });

  describe('When deleting one', () => {
    it('should softly delete existing user from database', async () => {
      await expect(service.remove(1)).resolves.toEqual<ResponseDto>({
        status: HttpStatus.OK,
        data: null,
      });

      expect(repository.delete).toBeCalledTimes(1);
      expect(repository.delete).toBeCalledWith(1);
    });
  });

  describe('When restoring one', () => {
    it('should restore softly deleted user in database', async () => {
      await expect(service.restore(1)).resolves.toEqual<ResponseDto>({
        status: HttpStatus.OK,
        data: null,
      });

      expect(repository.restore).toBeCalledTimes(1);
      expect(repository.restore).toBeCalledWith(1);
    });
  });
});
