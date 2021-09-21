import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthedGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    // calling a method that passport adds to the request object when sessions are in use
    // return context.switchToHttp().getRequest().isAuthenticated();
    return context.switchToHttp().getRequest().session?.id;
  }
}
