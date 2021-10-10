import {
  HealthIndicatorResult,
  MicroserviceHealthIndicator,
  MicroserviceHealthIndicatorOptions,
} from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { BaseHealthIndicator } from './base-health.indicator';

export class ServiceHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator
{
  public readonly name = 'Service';
  protected readonly help = 'Status of ' + this.name;
  private readonly indicator: MicroserviceHealthIndicator;
  private readonly key: string;
  private readonly options: MicroserviceHealthIndicatorOptions;
  protected readonly prometheusService: PrometheusService | undefined;

  constructor(
    indicator: MicroserviceHealthIndicator,
    key: string,
    options: MicroserviceHealthIndicatorOptions,
    prometheusService?: PrometheusService,
  ) {
    super();
    this.indicator = indicator;
    this.prometheusService = prometheusService;
    this.key = key;
    this.options = options;
    // this.registerMetrics();
    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    const result = await this.indicator.pingCheck(this.key, this.options);
    this.updatePrometheusData(true);
    return result;
  }
}
