import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponseMetadata,
} from '@nestjs/swagger';

export function WithOkApi(type: ApiResponseMetadata['type'], summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type }));
}

export function WithCreatedApi(
  type: ApiResponseMetadata['type'],
  summary: string,
) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiCreatedResponse({ type }),
  );
}
