import type { Request } from 'express';
import { WorkspacePolicy } from '../enums';
import { IAuth, ID } from '../interfaces';



export class AuthHeaders {
  static serializePermissions(policies: IAuth['policies']) {
    return Object.entries(policies)
      .map(([k, v]) => `${k}-${v.join()}`)
      .join(','); // "uuid-1234,uuid-24"
  }

  static deserializePermissions(permissionsHeader: string) {
    if (!permissionsHeader) return {};
    return permissionsHeader
      .split(',')
      .reduce<IAuth['policies']>((all, entryStr) => {
        const [projectId, permissionStr] = entryStr.split('-');
        if (!projectId || !permissionStr) return all;
        const policies = permissionStr
          .split('')
          .filter(
            (v) => +v in WorkspacePolicy,
          ) as unknown[] as WorkspacePolicy[];

        if (policies.length) {
          all[projectId] = policies;
        }
        return all;
      }, {});
  }

  static getDeserializedData(headers: Request['headers']) {
    return {
      userId: headers['x-user-id'],
      policies: AuthHeaders.deserializePermissions(
        headers['x-user-policies'] as string,
      ),
    } as IAuth;
  }

  static getSerializedHeaders(data: IAuth) {
    return {
      'x-user-id': data.userId,
      'x-user-policies': AuthHeaders.serializePermissions(data.policies),
    };
  }
}
