import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IAuthExtended } from '@taskapp/shared';
import local from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(local.Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<IAuthExtended> {
    const dto = { email, password };
    const profile = await this.authService.getProfile(null, dto);
    profile.permissions = await this.authService.getPermissions(profile.userId);

    return profile;
  }
}
