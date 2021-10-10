import { BaseIndicator } from './base.indicator';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { HealthIndicatorResult, MemoryHealthIndicator } from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';

export class MemoryIndicator extends BaseIndicator implements HealthIndicator {
  readonly name = 'MemoryHealthIndicator';
  protected readonly help = 'Status of ' + this.name;
  private readonly indicator: MemoryHealthIndicator;
  protected readonly prometheusService?: PrometheusService;

  constructor(prometheusService?: PrometheusService) {
    super();
    this.prometheusService = prometheusService;
    // this.registerMetrics();
    this.registerGauges();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    // The heap should not use more than 150MB memory
    const result = await this.indicator.checkHeap(
      'memory_heap',
      150 * 1024 * 1024,
    );
    // // The process should not use more than 150MB memory
    // this.indicator.checkRSS('memory_heap', 150 * 1024 * 1024);
    // // The process should not have more than 150MB allocated
    // this.indicator.checkRSS('memory_rss', 150 * 1024 * 1024);

    this.updatePrometheusData(true);
    return result;
  }
}
