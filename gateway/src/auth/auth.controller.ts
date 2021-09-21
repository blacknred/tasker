import { Body, Controller, Delete, Get, Post, Req } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { EmptyResponseDto } from './dto/empty-response.dto';
import { IAuthRequest } from './interfaces/authed-request.interface';

@Controller('v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiCreatedResponse({
    type: EmptyResponseDto,
  })
  async createAuth(
    @Body() createAuthDto: CreateAuthDto,
  ): Promise<EmptyResponseDto> {
    return this.authService.create(createAuthDto);
  }

  @Get()
  async getAuth(@Req() { user }: IAuthRequest): Promise<AuthResponseDto> {
    return this.authService.findOne(user.id);
  }

  @Delete()
  @ApiCreatedResponse({
    type: EmptyResponseDto,
  })
  removeAuth(@Req() { user }: IAuthRequest): EmptyResponseDto {
    return this.authService.remove(user.id);
  }
}
