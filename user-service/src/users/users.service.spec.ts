import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockUser = {
  name: 'testname',
  email: 'test@email.com',
  password: 'testpassword',
};

const mockRepository = () => ({
  create: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
});

const mockedConfigService = {
  get(key: string) {
    switch (key) {
      case 'JWT_EXPIRATION_TIME':
        return '3600';
    }
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = await module.get<UsersService>(UsersService);
    repository = await module.get<User>(User);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should save a user in the database', async () => {
      repository.create.mockResolvedValue('someUser');
      expect(repository.create).not.toHaveBeenCalled();
      const result = await service.create(mockUser);
      expect(repository.create).toHaveBeenCalledWith(mockUser);
      expect(result).toEqual('someUser');
    });
  });

  describe('getUsers', () => {
    it('should get all users', async () => {
      repository.find.mockResolvedValue('someUsers');
      expect(repository.find).not.toHaveBeenCalled();
      const result = await service.findAll({});
      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual('someUsers');
    });
  });

  describe('getUser', () => {
    it('should retrieve a user with an ID', async () => {
      repository.findOne.mockResolvedValue(mockUser);
      const result = await service.findOne(1);
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith(1);
    });

    it('throws an error as a product is not found', () => {
      productRepository.findOne.mockResolvedValue(null);
      expect(productService.getProduct(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('deleteUser', () => {
    it('should delete user', async () => {
      repository.delete.mockResolvedValue(1);
      expect(repository.delete).not.toHaveBeenCalled();
      await service.remove(1);
      expect(repository.delete).toHaveBeenCalledWith(1);
    });
  });
});
