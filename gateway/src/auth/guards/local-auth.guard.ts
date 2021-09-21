import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    // we extend AuthGuard('local') to make use super.logIn(request) method to user gets a session
    await super.logIn(context.switchToHttp().getRequest());
    return result;
  }
}
