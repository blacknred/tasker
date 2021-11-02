import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAgent } from 'src/workspaces/interfaces/agent.interface';

export const Agent = createParamDecorator(
  (data: keyof IAgent, ctx: ExecutionContext) => {
    const { agent } = ctx.switchToRpc().getContext();

    return data ? agent?.[data] : agent;
  },
);
