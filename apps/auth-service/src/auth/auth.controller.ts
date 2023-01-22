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
import { Auth, EmptyResponseDto, Session } from '@taskapp/shared';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RefreshTokenGuard from './guards/refreshTokenGuard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ description: 'Login' })
  @ApiCreatedResponse({ type: AuthResponseDto })
  create(@Session() data, @Res() res: Response): AuthResponseDto {
    const refresh = this.authService.createRefreshCookie(data.id);
    const access = this.authService.createAccessCookie(data.id);
    res.setHeader('Set-Cookie', [refresh, access]);

    return { data };
  }

  @Get()
  @Auth()
  @ApiOperation({ description: 'Get user data' })
  @ApiOkResponse({ type: AuthResponseDto })
  async getOne(@Session() { id }): Promise<UserResponseDto> {
    return this.usersService.findOne(id);
  }

  @Patch()
  @UseGuards(RefreshTokenGuard)
  @ApiOperation({ description: 'Refresh access token' })
  @ApiOkResponse({ type: AuthResponseDto })
  refresh(@Session() data, @Res() res: Response) {
    const access = this.authService.createAccessCookie(data.id);
    res.setHeader('Set-Cookie', access);

    return { data };
  }

  @Delete()
  @Auth()
  @ApiOperation({ description: 'Logout' })
  @ApiOkResponse({ type: EmptyResponseDto })
  delete(@Req() req): EmptyResponseDto {
    const cookie = this.authService.remove();
    req.setHeader('Set-Cookie', cookie);

    return { data: null };
  }
}
