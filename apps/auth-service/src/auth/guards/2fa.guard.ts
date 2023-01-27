import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ValidationPipe } from '@taskapp/shared';
import { TFAAuthDto } from '../dto';

@Injectable()
export class TFAGuard extends AuthGuard('jwt-2fa') {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // input dto validation
    const { body } = ctx.switchToHttp().getRequest();
    await new ValidationPipe({}).transform(body, {
      metatype: TFAAuthDto,
      type: 'body',
    });

    // call Jwt2FAStrategy.validate()
    const result = await super.canActivate(ctx);
    await super.logIn(ctx.switchToHttp().getRequest());

    return result as boolean;
  }
}
