import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { WORKSPACE_SERVICE } from '../consts';

export const workspaceProvider = {
  provide: WORKSPACE_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'workspace-service',
      },
    }),
};
