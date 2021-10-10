import { BaseHealthIndicator } from './base-health.indicator';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { HealthIndicatorResult, MemoryHealthIndicator } from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';

export class MemHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator
{
  public readonly name = 'MemoryHealthIndicator';
  protected readonly help = 'Status of ' + this.name;

  constructor(
    private indicator: MemoryHealthIndicator,
    protected prometheusService: PrometheusService,
  ) {
    super();
    // this.registerMetrics();
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const isHealthy = await this.indicator.checkHeap(
      'memory_heap',
      200 * 1024 * 1024,
    );
    // async () => this.indicator.checkRSS('memory_rss', 3000 * 1024 * 1024),

    this.updatePrometheusData(isHealthy);
    return this.getStatus(this.name, isHealthy);
  }
}
