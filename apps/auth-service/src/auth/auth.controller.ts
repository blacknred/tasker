import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, AuthHeaders, EmptyResponseDto, IAuth } from '@taskapp/shared';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto';
import {
  AuthGuard,
  LocalAuthGuard,
  RefreshTokenGuard,
  TFAGuard,
} from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'Login' })
  @ApiCreatedResponse({ type: AuthResponseDto })
  create(@Auth() data: IAuth, @Res() res: Response): AuthResponseDto {
    const refresh = this.authService.createRefreshCookie(data.userId);
    const access = this.authService.createAccessCookie(data);
    res.setHeader('Set-Cookie', [refresh, access]);

    return { data };
  }
  // passport-google-oauth
  // passport-github

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Check auth' })
  @ApiOkResponse({ type: AuthResponseDto })
  getOne(@Auth() data: IAuth, @Res() res: Response): AuthResponseDto {
    const headers = AuthHeaders.getSerializedHeaders(data);
    res.setHeader('x-user-id', headers['x-user-id']);
    res.setHeader('x-user-permissions', headers['x-user-permissions']);

    return { data };
  }

  @Patch('2fa')
  @UseGuards(TFAGuard)
  @ApiOperation({ description: '2FA' })
  @ApiCreatedResponse({ type: AuthResponseDto })
  totp(@Auth() data: IAuth, @Res() res: Response): AuthResponseDto {
    res.setHeader('Set-Cookie', this.authService.createAccessCookie(data));

    return { data };
  }

  @Patch()
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ description: 'Refresh access token' })
  @ApiNoContentResponse({ type: AuthResponseDto })
  refresh(@Auth() data: IAuth, @Res() res: Response): AuthResponseDto {
    res.setHeader('Set-Cookie', this.authService.createAccessCookie(data));

    return { data };
  }

  @Delete()
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Logout' })
  @ApiOkResponse({ type: EmptyResponseDto })
  delete(@Req() req): EmptyResponseDto {
    req.setHeader('Set-Cookie', this.authService.emptyCookie);

    return { data: null };
  }
}
