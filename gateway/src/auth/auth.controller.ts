import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { EmptyResponseDto } from '../__shared__/dto/response.dto';
import { Auth } from './decorators/auth.decorator';
import { AuthResponseDto } from './dto/auth-response.dto';
import { PushSubscriptionDto } from './dto/push-subscription.dto';
import { AuthedGuard } from './guards/authed.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAuth } from './interfaces/auth.interface';

@Controller('auth')
@ApiTags('Auth')
@UseFilters(AllExceptionFilter)
export class AuthController {
  vapidPublicKey: string;

  constructor(private readonly configService: ConfigService) {
    this.vapidPublicKey = this.configService.get('VAPID_PUBLIC_KEY');
  }

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: EmptyResponseDto })
  create(@Auth() user): AuthResponseDto {
    const data = { ...user, vapidPublicKey: this.vapidPublicKey };
    return { data };
  }

  @Get()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Get Session data' })
  @ApiOkResponse({ type: AuthResponseDto })
  getOne(@Auth('user') data): AuthResponseDto {
    return { data };
  }

  @Delete()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ type: EmptyResponseDto })
  delete(@Req() req): EmptyResponseDto {
    req.logout(); // req.session.destroy();
    return { data: null };
  }

  @Patch('createPush')
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Create Push Subscription' })
  @ApiOkResponse({ type: AuthResponseDto })
  createPush(
    @Auth() { pushSubscriptions, ...data }: IAuth,
    @Body() subscriptionDto: PushSubscriptionDto,
  ): AuthResponseDto {
    const dto = JSON.stringify(subscriptionDto);

    if (pushSubscriptions.every((sub) => JSON.stringify(sub) !== dto)) {
      pushSubscriptions.push(subscriptionDto);
    }

    return { data };
  }

  @Patch('deletePush')
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Delete Push Subscription' })
  @ApiOkResponse({ type: EmptyResponseDto })
  deletePush(
    @Auth('pushSubscriptions') pushSubscriptions,
    @Body() subscriptionDto: PushSubscriptionDto,
  ): EmptyResponseDto {
    const dto = JSON.stringify(subscriptionDto);
    const index = pushSubscriptions.findIndex(
      (sub) => JSON.stringify(sub) === dto,
    );

    if (index > -1) {
      pushSubscriptions.splice(index, 1);
    }

    return { data: null };
  }
}
