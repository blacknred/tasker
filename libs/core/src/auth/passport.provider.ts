import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IAuth, ProjectPermission } from '@taskapp/shared';
import type { Request } from 'express';
import custom from 'passport-custom';

@Injectable()
export class AuthStrategy extends PassportStrategy(
  custom.Strategy,
  'headers-auth',
) {
  async validate(request: Request) {
    const userId = request.header('x-user-id');
    if (!userId) {
      throw new UnauthorizedException();
    }

    const session: IAuth = { userId, permissions: new Map() };

    request
      .header('x-user-permissions') // "x-user-permissions"="uuid-1234,uuid-24"
      ?.split(',')
      .forEach((entryStr) => {
        const [projectId, permissionStr] = entryStr.split('-');
        if (projectId && permissionStr) {
          const permissions = permissionStr
            .split('')
            .filter(
              (v) => +v in ProjectPermission,
            ) as unknown[] as ProjectPermission[];

          if (permissions.length) {
            session.permissions.set(projectId, permissions);
          }
        }
      });

    return session;
  }
}

// create, getAll(email,password), getOne(me), patch, delete(soft)
// create(login=>tokens), getOne(from jwt), patch(upd access token), delete(logout)
