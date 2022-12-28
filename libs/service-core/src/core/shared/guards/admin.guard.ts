import {
  ExecutionContext, Injectable
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AdminGuard extends AuthGuard {
  constructor() {
    super();
  }

  canActivate(ctx: ExecutionContext): boolean {
    return (
      super.canActivate(ctx) &&
      ctx.switchToHttp().getRequest().headers['x-if-admin']
    );
  }
}
