import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Agent = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const { agent } = ctx.switchToRpc().getContext();

    return data ? agent?.[data] : agent;
  },
);
