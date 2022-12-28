import { applyDecorators } from '@nestjs/common';
import type { ApiResponseMetadata } from '@nestjs/swagger';
import {
  ApiOperation,
  ApiResponse
} from '@nestjs/swagger';

export function Api({
  type,
  description: summary,
  status = 200
}: ApiResponseMetadata) {
  return applyDecorators(
    ApiOperation({ summary }),
    // ApiCreatedResponse({ type }),
    // ApiOkResponse({ type })
    ApiResponse({ status, type })
  );
}
