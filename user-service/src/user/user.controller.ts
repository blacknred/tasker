import { Controller, HttpStatus, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('MAIL_SERVICE') private readonly mailServiceClient: ClientProxy,
  ) {}

  @MessagePattern('user_search_by_credentials')
  public async searchUserByCredentials(searchParams: {
    email: string;
    password: string;
  }): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse;

    if (searchParams.email && searchParams.password) {
      const user = await this.userService.searchUser({
        email: searchParams.email,
      });

      if (user && user[0]) {
        if (await user[0].compareEncryptedPassword(searchParams.password)) {
          result = {
            status: HttpStatus.OK,
            message: 'user_search_by_credentials_success',
            user: user[0],
          };
        } else {
          result = {
            status: HttpStatus.NOT_FOUND,
            message: 'user_search_by_credentials_not_match',
            user: null,
          };
        }
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_search_by_credentials_not_found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.NOT_FOUND,
        message: 'user_search_by_credentials_not_found',
        user: null,
      };
    }

    return result;
  }

  @MessagePattern('getById')
  public async getUserById(id: string): Promise<IUserSearchResponse> {
    let result: IUserSearchResponse;

    if (id) {
      const user = await this.userService.findOne(id);
      if (user) {
        result = {
          status: HttpStatus.OK,
          message: 'user_get_by_id_success',
          user,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_get_by_id_not_found',
          user: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_get_by_id_bad_request',
        user: null,
      };
    }

    return result;
  }

  @MessagePattern('confirm')
  public async confirmUser(confirmParams: {
    link: string;
  }): Promise<IUserConfirmResponse> {
    let result: IUserConfirmResponse;

    if (confirmParams) {
      const userLink = await this.userService.getUserLink(confirmParams.link);

      if (userLink && userLink[0]) {
        const userId = userLink[0].user_id;
        await this.userService.updateUserById(userId, {
          is_confirmed: true,
        });
        await this.userService.updateUserLinkById(userLink[0].id, {
          is_used: true,
        });
        result = {
          status: HttpStatus.OK,
          message: 'user_confirm_success',
          errors: null,
        };
      } else {
        result = {
          status: HttpStatus.NOT_FOUND,
          message: 'user_confirm_not_found',
          errors: null,
        };
      }
    } else {
      result = {
        status: HttpStatus.BAD_REQUEST,
        message: 'user_confirm_bad_request',
        errors: null,
      };
    }

    return result;
  }

  @MessagePattern('create')
  public async createUser(params: IUser): Promise<IUserCreateResponse> {
    if (!params) {
      return {
        status: HttpStatus.BAD_REQUEST,
        user: null,
        errors: null,
      }
    }

    const isEmailInUse = await this.userService.findUser({
      email: params.email,
    });

    if (isEmailInUse) {
      return {
        status: HttpStatus.CONFLICT,
        user: null,
        errors: {
          email: {
            message: 'Email already exists',
            path: 'email',
          },
        },
      };
    } 

    try {
      params.is_confirmed = false;
      const createdUser = await this.userService.createUser(params);
      const userLink = await this.userService.createUserLink(createdUser.id);
      delete createdUser.password;

      this.mailServiceClient.send('mail_send', {
        to: createdUser.email,
        subject: 'Email confirmation',
        html: `<center>
        <b>Hi there, please confirm your email to use Smoothday.</b><br>
        Use the following link for this.<br>
        <a href="${this.userService.getConfirmationLink(
          userLink.link,
        )}"><b>Confirm The Email</b></a>
        </center>`,
      });

      return {
        status: HttpStatus.CREATED,
        user: createdUser,
        errors: null,
      };
    } catch (e) {
      return {
        status: HttpStatus.PRECONDITION_FAILED,
        errors: e.errors,
        user: null
      };
    }
  }
}
