import { createParamDecorator } from '@nestjs/common';

export const Auth = createParamDecorator((_, req) => req.user);
