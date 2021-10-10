import {
  HealthIndicatorResult,
  MicroserviceHealthIndicator,
  MicroserviceHealthIndicatorOptions,
} from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { BaseIndicator } from './base.indicator';

export class MicroserviceIndicator
  extends BaseIndicator
  implements HealthIndicator
{
  readonly name = 'Service';
  protected readonly help = 'Status of ' + this.name;
  private readonly indicator: MicroserviceHealthIndicator;
  private readonly key: string;
  private readonly options: MicroserviceHealthIndicatorOptions;
  protected readonly prometheusService?: PrometheusService;

  constructor(
    key: string,
    options: MicroserviceHealthIndicatorOptions,
    prometheusService?: PrometheusService,
  ) {
    super();
    this.key = key;
    this.options = options;
    this.prometheusService = prometheusService;
    // this.registerMetrics();
    this.registerGauges();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const result = await this.indicator.pingCheck(this.key, this.options);
    this.updatePrometheusData(true);
    return result;
  }

  // custom service
  // public async isHealthy(): Promise<HealthIndicatorResult> {
  //   const isHealthy = this.service.isConnected;
  //   this.updatePrometheusData(isHealthy);
  //   return this.getStatus(this.name, isHealthy);
  // }
}
