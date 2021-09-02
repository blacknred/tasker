import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Link from './entities/link.entity';
import User from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Link) private linkRepository: Repository<Link>,
    private readonly configService: ConfigService
  ) {}

  getOne() {
    this.userRepository.
  }

  getAllPosts() {
    return this.userRepository.find();
  }
}

//   public async searchUser(params: { email: string }): Promise<IUser[]> {
//     return this.userModel.find(params).exec();
//   }

//   public async searchUserById(id: string): Promise<IUser> {
//     return this.userModel.findById(id).exec();
//   }

//   public async updateUserById(
//     id: string,
//     userParams: { is_confirmed: boolean },
//   ): Promise<IUser> {
//     return this.userModel.updateOne({ _id: id }, userParams).exec();
//   }

//   public async createUser(user: IUser): Promise<IUser> {
//     const userModel = new this.userModel(user);
//     return await userModel.save();
//   }

//   public async createUserLink(id: string): Promise<IUserLink> {
//     const userLinkModel = new this.userLinkModel({
//       user_id: id,
//     });
//     return await userLinkModel.save();
//   }

//   public async getUserLink(link: string): Promise<IUserLink[]> {
//     return this.userLinkModel.find({ link, is_used: false }).exec();
//   }

//   public async updateUserLinkById(
//     id: string,
//     linkParams: { is_used: boolean },
//   ): Promise<IUserLink> {
//     return this.userLinkModel.updateOne({ _id: id }, linkParams);
//   }

//   public getConfirmationLink(link: string): string {
//     return `${this.configService.get('baseUri')}:${this.configService.get(
//       'gatewayPort',
//     )}/users/confirm/${link}`;
//   }
// }