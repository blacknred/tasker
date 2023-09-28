import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import type { IAuth } from '@taskapp/shared';
import local from 'passport-local';
import { AuthService } from '../workspace.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(local.Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<IAuth> {
    const dto = { email, password };
    const auth = await this.authService.getAuth(dto);
    auth.permissions = await this.authService.getPermissions(auth.userId);

    return auth;
  }
}
