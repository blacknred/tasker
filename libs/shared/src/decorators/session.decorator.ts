import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { ISession } from '../interfaces';

export const Session = createParamDecorator(
  (prop: keyof ISession, ctx: ExecutionContext) => {
    const { user } = ctx.switchToHttp().getRequest();

    return prop ? user?.[prop] : user;
  },
);
