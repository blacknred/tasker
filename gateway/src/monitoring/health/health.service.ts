import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';
import { PrometheusService } from '../prometheus/prometheus.service';
// import { DiskIndicator } from './indicators/disk.indicator';
import { MemoryIndicator } from './indicators/memory.indicator';
import { MicroserviceIndicator } from './indicators/microservice.indicator';
import { HealthIndicator } from './interfaces/health-indicator.interface';

@Injectable()
export class HealthService {
  private readonly targets: HealthIndicator[];
  private readonly logger = new Logger(HealthService.name);

  constructor(
    private configService: ConfigService,
    private health: HealthCheckService,
    private prometheusService: PrometheusService,
  ) {
    this.targets = [
      new MicroserviceIndicator(
        'UserMicroservice',
        {
          transport: Transport.TCP,
          options: { host: 'user-service' },
        },
        this.prometheusService,
      ),
      new MicroserviceIndicator(
        'TaskMicroservice',
        {
          transport: Transport.TCP,
          options: { host: 'task-service' },
        },
        this.prometheusService,
      ),
      new MicroserviceIndicator(
        'Cache',
        {
          transport: Transport.REDIS,
          options: {
            url: this.configService.get('CACHE_URL'),
          },
        },
        this.prometheusService,
      ),
      // new MicroserviceIndicator(
      //   'queue',
      //   {
      //     transport: Transport.RMQ,
      //     options: {
      //       urls: [this.configService.get('QUEUE_URL')],
      //     },
      //   },
      //   this.prometheusService,
      // ),
      new MemoryIndicator(this.prometheusService),
      // new DiskIndicator(this.prometheusService),
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return await this.health.check(
      this.targets.map((indicator) => async () => {
        try {
          return await indicator.isHealthy();
        } catch (e) {
          this.logger.warn(e);
          return indicator.reportUnhealthy();
        }
      }),
    );
  }
}
