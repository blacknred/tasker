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
import { EmptyResponseDto } from '../shared/dto/empty-response.dto';
import { AuthResponseDto } from './dto/auth-response.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { IAuthedRequest } from './interfaces/authed-request.interface';
import { AuthedGuard } from './guards/authed.guard';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  @Post()
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login' })
  @ApiCreatedResponse({ type: EmptyResponseDto })
  create(
    @Req() { user }: IAuthedRequest,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    @Body() createAuthDto: CreateAuthDto,
  ): AuthResponseDto {
    return { data: user };
  }

  @Get()
  @UseGuards(AuthedGuard)
  @ApiOperation({ summary: 'Get Session data' })
  @ApiOkResponse({ type: AuthResponseDto })
  getOne(@Req() { user }: IAuthedRequest): AuthResponseDto {
    return { data: user };
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
