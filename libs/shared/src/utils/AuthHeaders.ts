import type { Request } from 'express';
import { IAuth } from '../interfaces';

export class AuthHeaders {
  static getDeserializedData(headers: Request['headers']) {
    return {
      userId: headers['x-auth-user'],
      workspaceId: headers['x-auth-workspace'],
      permissions: headers['x-auth-permissions'].toString().split(','),
    } as IAuth;
  }

  static getSerializedHeaders(data: IAuth) {
    return {
      'x-user-id': data.userId,
      'x-auth-workspace': data.workspaceId,
      'x-user-permissions': data.permissions.join(','),
    };
  }
}
