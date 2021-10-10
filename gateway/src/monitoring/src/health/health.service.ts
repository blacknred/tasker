import { Injectable, Logger } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  //
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
  MicroserviceHealthIndicator,
  MemoryHealthIndicator,
  DiskHealthIndicator,
  // MongooseHealthIndicator,
  // SequelizeHealthIndicator,
  // GRPCHealthIndicator,
} from '@nestjs/terminus';
import { PrometheusService } from '../prometheus/prometheus.service';
// import { AnyOtherService } from '../any-other-module/any-other.service';
import { HealthIndicator } from './interfaces/health-indicator.interface';
import { ServiceHealthIndicator } from './indicators/service-health.indicator';
import { MemHealthIndicator } from './indicators/mem-health.indicator';
import { Transport } from '@nestjs/microservices';
// import { AnyOtherHealthIndicator } from './indicators/mem-health.indicator';

@Injectable()
export class HealthService {
  private readonly targets: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private prometheusService: PrometheusService,
    private microservice: MicroserviceHealthIndicator,
    private memory: MemoryHealthIndicator,
  ) {
    this.targets = [
      new ServiceHealthIndicator(
        this.microservice,
        'user-service',
        {
          transport: Transport.TCP,
          options: { host: 'user-service' },
        },
        this.prometheusService,
      ),
      new ServiceHealthIndicator(
        this.microservice,
        'task-service',
        {
          transport: Transport.TCP,
          options: { host: 'task-service' },
        },
        this.prometheusService,
      ),
      new ServiceHealthIndicator(
        this.microservice,
        'notification-service',
        {
          transport: Transport.TCP,
          options: { host: 'notification-service' },
        },
        this.prometheusService,
      ),
      new ServiceHealthIndicator(
        this.microservice,
        'worker-service',
        {
          transport: Transport.TCP,
          options: { host: 'worker-service' },
        },
        this.prometheusService,
      ),
      new MemHealthIndicator(this.memory, this.prometheusService),
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return await this.health.check(
      this.targets.map((indicator) => async () => {
        try {
          return await indicator.isHealthy();
        } catch (e) {
          Logger.warn(e);
          return indicator.reportUnhealthy();
        }
      }),
    );
  }
}
