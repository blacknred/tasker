import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmptyResponseDto } from '../__shared__/dto/empty-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAuthedRequest } from './interfaces/authed-request.interface';
import { AuthedGuard } from './guards/authed.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  vapidPublicKey: string;

  constructor(private readonly configService: ConfigService) {
    this.vapidPublicKey = this.configService.get('VAPID_PUBLIC_KEY');
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: EmptyResponseDto })
  create(
    @Req() { user }: IAuthedRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() createAuthDto: CreateAuthDto,
  ): AuthResponseDto {
    const data = { ...user, vapidPublicKey: this.vapidPublicKey };
    return { data };
  }

  @Get()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Get Session data' })
  @ApiOkResponse({ type: AuthResponseDto })
  getOne(@Req() { user }: IAuthedRequest): AuthResponseDto {
    const data = { ...user, vapidPublicKey: this.vapidPublicKey };
    return { data };
  }

  @Delete()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ type: EmptyResponseDto })
  delete(@Req() req): EmptyResponseDto {
    req.logout();
    return { data: null };
  }
}

// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Inject,
//   Post,
//   Req,
//   UseGuards,
// } from '@nestjs/common';
// import {
//   ApiCreatedResponse,
//   ApiOkResponse,
//   ApiOperation,
//   ApiTags,
// } from '@nestjs/swagger';
// import { CreateAuthDto } from './dto/create-auth.dto';
// import { EmptyResponseDto } from '../__shared__/dto/empty-response.dto';
// import { AuthResponseDto } from './dto/auth-response.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
// import { IAuthedRequest } from './interfaces/authed-request.interface';
// import { AuthedGuard } from './guards/authed.guard';
// import { ConfigService } from '@nestjs/config';
// import { NOTIFICATION_SERVICE } from './consts';
// import { ClientProxy } from '@nestjs/microservices';
// import { SharedService } from 'src/__shared__/shared.service';

// @Controller('notifications')
// @ApiTags('Notifications')
// export class PushSubscriptionsController {
//   constructor(
//     private readonly pushService: SharedService,
//     @Inject(NOTIFICATION_SERVICE) protected readonly client: ClientProxy,
//   ) {
//     this.pushService.client = client;
//   }

//   // @Post()
//   // @UseGuards(LocalAuthGuard)
//   // @ApiOperation({ summary: 'Login' })
//   // @ApiCreatedResponse({ type: EmptyResponseDto })
//   // create(
//   //   @Req() { user }: IAuthedRequest,
//   //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   //   @Body() createAuthDto: CreateAuthDto,
//   // ): AuthResponseDto {
//   //   const data = { ...user, vapidPublicKey: this.vapidPublicKey };
//   //   return { data };
//   // }
//   @Post()
//   @ApiOperation({ summary: 'Create user subscription' })
//   @ApiCreatedResponse({ type: UserResponseDto })
//   async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
//     return this.pushService.feed('create', createUserDto);
//   }

//   @Delete()
//   @ApiOperation({ summary: 'Delete push subscription' })
//   @ApiOkResponse({ type: EmptyResponseDto })
//   async remove(@Req() { user }: IAuthedRequest): Promise<EmptyResponseDto> {
//     return this.pushService.feed('delete', +user.id);
//   }
// }
