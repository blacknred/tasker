import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto, GetValidatedUserDto } from './dto/get-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import {
  ResponseDto,
  UserResponseDto,
  UsersResponseDto,
} from './dto/response.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const mockCreateUserDto = {
  name: 'testname',
  email: 'test@email.com',
  password: 'testpassword',
};

const mockUser = new User(mockCreateUserDto);

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(
              Promise.resolve({
                status: HttpStatus.CREATED,
                data: mockUser,
              }),
            ),
            findAll: jest.fn().mockResolvedValue(
              Promise.resolve({
                status: HttpStatus.OK,
                data: {
                  items: [mockUser],
                  hasMore: false,
                  total: 2,
                },
              }),
            ),
            findOne: jest.fn().mockResolvedValue({
              status: HttpStatus.OK,
              data: mockUser,
            }),
            findOneValidated: jest.fn().mockResolvedValue({
              status: HttpStatus.OK,
              data: mockUser,
            }),
            update: jest.fn().mockResolvedValue({
              status: HttpStatus.OK,
              data: {
                ...mockUser,
                name: 'supertestname',
              },
            }),
            remove: jest.fn((params: CreateUserDto) =>
              Promise.resolve({
                status: HttpStatus.OK,
                data: null,
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('When creating one', () => {
    it('should create a new user', async () => {
      const response = {
        status: HttpStatus.CREATED,
        data: mockUser,
      };
      const createSpy = jest
        .spyOn(service, 'create')
        .mockResolvedValueOnce(response);
      await expect(
        controller.create(mockCreateUserDto),
      ).resolves.toEqual<UserResponseDto>(response);
      expect(createSpy).toBeCalledWith(mockCreateUserDto);
      // expect(service.findOne(2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('When getting all', () => {
    it('should return an array of users by params', async () => {
      const params: GetUsersDto = { limit: 5, offset: 1 };
      await expect(
        controller.getAll(params),
      ).resolves.toEqual<UsersResponseDto>({
        status: HttpStatus.OK,
        data: {
          items: [mockUser],
          hasMore: false,
          total: 2,
        },
      });
    });
  });

  describe('When getting one', () => {
    it('should return an user', async () => {
      const params: GetUserDto = { id: 1 };
      await expect(controller.getOne(params)).resolves.toEqual<UserResponseDto>(
        {
          status: HttpStatus.OK,
          data: mockUser,
        },
      );
    });
  });

  describe('When getting validated one', () => {
    it('should return an user', async () => {
      const params: GetValidatedUserDto = { ...mockCreateUserDto };
      await expect(
        controller.getOneValidate(params),
      ).resolves.toEqual<UserResponseDto>({
        status: HttpStatus.OK,
        data: mockUser,
      });
    });
  });

  describe('When updating one', () => {
    it('should update an user', async () => {
      const params: UpdateUserDto = { id: 1, name: 'supertestname' };
      await expect(controller.update(params)).resolves.toEqual<UserResponseDto>(
        {
          status: HttpStatus.OK,
          data: {
            ...mockUser,
            name: 'supertestname',
          },
        },
      );
    });
  });

  describe('When deleting one', () => {
    it('should delete an user', async () => {
      const params: GetUserDto = { id: 1 };
      await expect(controller.remove(params)).resolves.toEqual<ResponseDto>({
        status: HttpStatus.OK,
        data: null,
      });
    });
  });
});
