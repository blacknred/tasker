import { ProjectPermission } from '../enums';
import { IAuth } from '../interfaces';
import type { Request } from 'express';

export class AuthHeaders {
  static serializePermissions(permissions: IAuth['permissions']) {
    return Object.entries(permissions)
      .map(([k, v]) => `${k}-${v.join()}`)
      .join(','); // "uuid-1234,uuid-24"
  }

  static deserializePermissions(permissionsHeader: string) {
    if (!permissionsHeader) return {};
    return permissionsHeader
      .split(',')
      .reduce<IAuth['permissions']>((all, entryStr) => {
        const [projectId, permissionStr] = entryStr.split('-');
        if (!projectId || !permissionStr) return all;
        const permissions = permissionStr
          .split('')
          .filter(
            (v) => +v in ProjectPermission,
          ) as unknown[] as ProjectPermission[];

        if (permissions.length) {
          all[projectId] = permissions;
        }
        return all;
      }, {});
  }

  static getDeserializedData(headers: Request['headers']) {
    return {
      userId: headers['x-user-id'],
      permissions: AuthHeaders.deserializePermissions(
        headers['x-user-permissions'] as string,
      ),
    } as IAuth;
  }

  static getSerializedHeaders(data: IAuth) {
    return {
      'x-user-id': data.userId,
      'x-user-permissions': AuthHeaders.serializePermissions(data.permissions),
    };
  }
}
