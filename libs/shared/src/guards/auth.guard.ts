import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext) {
    if (!ctx.switchToHttp().getRequest().headers['x-user-id']) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
