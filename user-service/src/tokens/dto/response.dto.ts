import { PaginatedResponseDto } from '../../__shared__/dto/response.dto';
import { IToken } from '../interfaces/token.interface';

export class TokensResponseDto extends PaginatedResponseDto<IToken> {}
