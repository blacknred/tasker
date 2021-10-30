import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AllExceptionFilter } from 'src/__shared__/filters/all-exception.filter';
import { AdminGuard } from 'src/__shared__/guards/admin.guard';
import { Auth } from '../__shared__/decorators/auth.decorator';
import { EmptyResponseDto } from '../__shared__/dto/response.dto';
import { AuthGuard } from '../__shared__/guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { AuthsResponseDto } from './dto/auths-response.dto';
import { GetAuthsDto } from './dto/get-auths.dto';
import { PushSubscriptionResponseDto } from './dto/push-subscription-response.dto';
import { PushSubscriptionDto } from './dto/push-subscription.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('auth')
@ApiTags('Auth')
@UseFilters(AllExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: EmptyResponseDto })
  create(@Auth() auth): AuthResponseDto {
    return this.authService.create(auth);
  }

  @Get()
  @UseGuards(AdminGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get all sessions' })
  @ApiOkResponse({ type: AuthsResponseDto })
  async getAll(@Query() getUsersDto: GetAuthsDto): Promise<AuthsResponseDto> {
    return this.authService.findAll(getUsersDto);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Get session' })
  @ApiOkResponse({ type: AuthResponseDto })
  getOne(@Auth('user') data): AuthResponseDto {
    return { data };
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Logout' })
  @ApiOkResponse({ type: EmptyResponseDto })
  delete(@Req() req): EmptyResponseDto {
    req.logout(); // req.session.destroy();
    return { data: null };
  }

  @Patch('createPush')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Create push subscription' })
  @ApiOkResponse({ type: AuthResponseDto })
  createPush(
    @Auth('pushSubscriptions') subscriptions,
    @Body(ValidationPipe) subscriptionDto: PushSubscriptionDto,
  ): PushSubscriptionResponseDto {
    return this.authService.createPush(subscriptions, subscriptionDto);
  }

  @Patch('deletePush')
  @UseGuards(AuthGuard)
  @ApiCookieAuth()
  @ApiOperation({ summary: 'Delete push subscription' })
  @ApiOkResponse({ type: EmptyResponseDto })
  deletePush(
    @Auth('pushSubscriptions') subscriptions,
    @Body(ValidationPipe) subscriptionDto: PushSubscriptionDto,
  ): EmptyResponseDto {
    return this.authService.deletePush(subscriptions, subscriptionDto);
  }
}
