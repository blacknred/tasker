import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ResponseDto } from 'src/__shared__/dto/response.dto';
import { CreateTokenDto } from './dto/create-token.dto';
import { GetTokensDto } from './dto/get-tokens.dto';
import { TokensResponseDto } from './dto/response.dto';
import { TokensService } from './tokens.service';

@Controller()
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @MessagePattern('tokens/create')
  async create(
    @Payload() createTokenDto: CreateTokenDto,
  ): Promise<ResponseDto> {
    return this.tokensService.create(createTokenDto);
  }

  @MessagePattern('tokens/getAll')
  async getAll(
    @Payload() getTokensDto: GetTokensDto,
  ): Promise<TokensResponseDto> {
    return this.tokensService.findAll(getTokensDto);
  }
}
