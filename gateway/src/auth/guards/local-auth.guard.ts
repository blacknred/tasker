import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateAuthDto } from '../dto/create-auth.dto';
import { ValidationPipe } from '../pipes/validation.pipe';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    // input validation
    const { body } = ctx.switchToHttp().getRequest();
    await new ValidationPipe().transform(body, {
      metatype: CreateAuthDto,
      type: 'body',
    });

    // call LocalStrategy.validate()
    const result = (await super.canActivate(ctx)) as boolean;

    // gets a user session
    await super.logIn(ctx.switchToHttp().getRequest());

    return result;
  }

  // handleRequest(err, user, info) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}
