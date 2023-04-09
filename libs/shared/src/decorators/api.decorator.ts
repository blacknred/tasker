import { applyDecorators } from '@nestjs/common';
import type { ApiResponseOptions } from '@nestjs/swagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

export function Api(summary: string, responses: ApiResponseOptions[]) {
  return applyDecorators(
    ApiOperation({ summary }),
    ...responses.map((opts) => ApiResponse(opts)),
  );
}
