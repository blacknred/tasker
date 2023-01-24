import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { IAuth } from '../interfaces';

export const Auth = createParamDecorator(
  (prop: keyof IAuth, ctx: ExecutionContext) => {
    const user: IAuth = ctx.switchToHttp().getRequest().user;

    return prop ? user?.[prop] : user;
  },
);
