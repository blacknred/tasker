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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, EmptyResponseDto, IAuth, IAuthExtended } from '@taskapp/shared';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthResponseDto, LoginResponseDto } from './dto';
import { AuthGuard, LocalAuthGuard, RefreshTokenGuard } from './guards';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'Login' })
  @ApiCreatedResponse({ type: LoginResponseDto })
  create(@Auth() data: IAuthExtended, @Res() res: Response): LoginResponseDto {
    const refresh = this.authService.createRefreshCookie(data);
    const access = this.authService.createAccessCookie(data);
    res.setHeader('Set-Cookie', [refresh, access]);

    return { data };
  }
  // passport-facebook
  // passport-github
  // passport-google-oauth

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ description: 'Check auth' })
  @ApiOkResponse({ type: AuthResponseDto })
  async getOne(
    @Auth() data: IAuth,
    @Res() res: Response,
  ): Promise<AuthResponseDto> {
    res.setHeader('x-user-id', data.userId);
    res.setHeader(
      'x-user-permissions',
      this.authService.serializePermissions(data.permissions),
    );

    return { data };
  }

  @Patch()
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ description: 'Refresh access token' })
  @ApiOkResponse({ type: AuthResponseDto })
  refresh(@Auth() data: IAuthExtended, @Res() res: Response) {
    const access = this.authService.createAccessCookie(data);
    res.setHeader('Set-Cookie', access);

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

// post(cred) => Accounts,Teammates => set tokens => profile
// patch(refresh_tkn) => Accounts,Teammates => set access_token => data
// get(access_tkn) => set headers => data
