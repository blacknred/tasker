import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApBaseResponseMetadata,
} from '@nestjs/swagger';

export function WithOkApi(type: ApBaseResponseMetadata['type'], summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiOkResponse({ type }));
}

export function WithCreatedApi(
  type: ApBaseResponseMetadata['type'],
  summary: string,
) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiCreatedResponse({ type }),
  );
}
