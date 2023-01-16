import {
  HealthIndicatorResult,
  MicroserviceHealthIndicator,
  MicroserviceHealthIndicatorOptions
} from '@nestjs/terminus';
import { PrometheusService } from '../../prometheus/prometheus.service';
import { HealthIndicator } from '../interfaces/health-indicator.interface';
import { BaseIndicator } from './base.indicator';

export class MicroserviceIndicator
  extends BaseIndicator
  implements HealthIndicator
{
  name = 'Indicator';
  protected readonly help = 'Status of ' + this.name;
  private readonly indicator = new MicroserviceHealthIndicator();
  private readonly key: string;
  private readonly options: MicroserviceHealthIndicatorOptions;
  protected readonly prometheusService?: PrometheusService;

  constructor(
    key: string,
    options: MicroserviceHealthIndicatorOptions,
    prometheusService?: PrometheusService,
  ) {
    super();
    this.name = key + this.name;
    this.key = key;
    this.options = options;
    this.prometheusService = prometheusService;
    this.registerGauges();
  }

  async isHealthy(): Promise<HealthIndicatorResult> {
    const result = await this.indicator.pingCheck(this.key, this.options);
    // const result = this.getStatus(this.name, this.service.isConnected); // custom
    this.updatePrometheusData(true);
    return result;
  }
}
