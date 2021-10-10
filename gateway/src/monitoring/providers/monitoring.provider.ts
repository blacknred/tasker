import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { MONITORING_SERVICE } from '../consts';

export const monitoringProvider = {
  provide: MONITORING_SERVICE,
  useFactory: () =>
    ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'monitoring-service',
      },
    }),
};
