import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';
import { PrometheusService } from '../prometheus/prometheus.service';
import { MemoryIndicator } from './indicators/memory.indicator';
import { MicroserviceIndicator } from './indicators/microservice.indicator';
import { DiskIndicator } from './indicators/disk.indicator';
import { HealthIndicator } from './interfaces/health-indicator.interface';

@Injectable()
export class HealthService {
  private readonly targets: HealthIndicator[];

  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private prometheusService: PrometheusService,
  ) {
    this.targets = [
      new MicroserviceIndicator(
        'user-service',
        {
          transport: Transport.TCP,
          options: { host: 'user-service' },
        },
        this.prometheusService,
      ),
      new MicroserviceIndicator(
        'task-service',
        {
          transport: Transport.TCP,
          options: { host: 'task-service' },
        },
        this.prometheusService,
      ),
      new MicroserviceIndicator(
        'notification-service',
        {
          transport: Transport.TCP,
          options: { host: 'notification-service' },
        },
        this.prometheusService,
      ),
      new MicroserviceIndicator(
        'worker-service',
        {
          transport: Transport.RMQ,
          options: {
            urls: [this.configService.get('QUEUE_URL')],
          },
        },
        this.prometheusService,
      ),
      new MicroserviceIndicator(
        'cache',
        {
          transport: Transport.REDIS,
          options: {
            url: this.configService.get('REDIS_URL'),
          },
        },
        this.prometheusService,
      ),
      new MemoryIndicator(this.prometheusService),
      new DiskIndicator(this.prometheusService),
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
