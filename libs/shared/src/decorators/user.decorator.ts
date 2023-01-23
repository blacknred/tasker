import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { IAuth } from '../interfaces';

export const User = createParamDecorator(
  (prop: keyof IAuth, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    return prop ? user?.[prop] : user;
  },
);
