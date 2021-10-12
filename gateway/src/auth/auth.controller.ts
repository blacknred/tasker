import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Req,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { EmptyResponseDto } from '../__shared__/dto/empty-response.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { PushSubscriptionDto } from './dto/push-subscription.dto';
import { AuthedGuard } from './guards/authed.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAuth } from './interfaces/auth.interface';

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(@Auth() { pushSubscriptions, ...rest }: IAuth): AuthResponseDto {
    const data = { ...rest, vapidPublicKey: this.vapidPublicKey };
    return { data };
  }

  @Get()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Get Session data' })
  @ApiOkResponse({ type: AuthResponseDto })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOne(@Auth() { pushSubscriptions, ...data }: IAuth): AuthResponseDto {
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

  @Post('push')
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Create Push Subscription' })
  @ApiOkResponse({ type: AuthResponseDto })
  createPush(
    @Auth() { pushSubscriptions, ...data }: IAuth,
    @Session() session: Record<string, any>,
    @Body() subscriptionDto: PushSubscriptionDto,
  ): AuthResponseDto {
    if (pushSubscriptions.every((sub) => sub != subscriptionDto)) {
      pushSubscriptions.push(subscriptionDto);
      session.pushSubscriptions = pushSubscriptions;
    }

    return { data };
  }

  @Delete('push')
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Delete Push Subscription' })
  @ApiOkResponse({ type: EmptyResponseDto })
  deletePush(
    @Auth() { pushSubscriptions }: IAuth,
    @Session() session: Record<string, any>,
    @Body() subscriptionDto: PushSubscriptionDto,
  ): EmptyResponseDto {
    const index = pushSubscriptions.findIndex((sub) => sub === subscriptionDto);

    if (index > -1) {
      pushSubscriptions.splice(index, 1);
      session.pushSubscriptions = pushSubscriptions;
    }

    return { data: null };
  }
}
