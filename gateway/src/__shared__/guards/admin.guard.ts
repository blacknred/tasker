import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AuthedGuard } from './authed.guard';

@Injectable()
export class AdminGuard extends AuthedGuard {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext): boolean {
    try {
      return (
        super.canActivate(context) &&
        context.switchToHttp().getRequest().user.isAdmin
      );
    } catch (_) {
      throw new ForbiddenException('Access restricted');
    }
  }
}
