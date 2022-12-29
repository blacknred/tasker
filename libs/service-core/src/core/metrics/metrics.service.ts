import { Injectable, Logger } from '@nestjs/common';
import { HealthService } from '../health/health.service';
import { PrometheusService } from '../prometheus/prometheus.service';

@Injectable()
export class MetricsService {
  private readonly logger = new Logger(MetricsService.name);

  constructor(
    private prometheusService: PrometheusService,
    private healthService: HealthService,
  ) {}

  public get metrics(): Promise<string> {
    this.healthService.check();
    return this.prometheusService.metrics;
  }
}
