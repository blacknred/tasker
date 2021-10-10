import { Module } from '@nestjs/common';
import { StatusMonitorModule } from 'nestjs-status-monitor';
import { SharedModule } from 'src/__shared__/shared.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    StatusMonitorModule.forRoot({
      title: 'Health Monitor',
      path: '/health',
      socketPath: 'socket.io',
      port: 8080,
      ignoreStartsWith: ['/health'],
      spans: [
        {
          interval: 1,
          retention: 60,
        },
        {
          interval: 5,
          retention: 60,
        },
        {
          interval: 15,
          retention: 60,
        },
      ],
      healthChecks: [
        {
          protocol: 'http',
          host: '127.0.0.1',
          path: '/api/v1/health/users',
          port: 3000,
        },
        {
          protocol: 'http',
          host: '127.0.0.1',
          path: '/api/v1/health/tasks',
          port: 3000,
        },
      ],
      chartVisibility: {
        cpu: true,
        mem: true,
        load: true,
        responseTime: true,
        rps: true,
        statusCodes: true,
      },
    }),
    SharedModule,
  ],
  controllers: [HealthController],
})
export class HealthModule {}
