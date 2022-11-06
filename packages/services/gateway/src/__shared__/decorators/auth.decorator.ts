import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAuth } from 'src/auth/interfaces/auth.interface';

export const Auth = createParamDecorator(
  (prop: keyof IAuth, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    return prop ? user?.[prop] : user;
  },
);
