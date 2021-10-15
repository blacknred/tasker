import { Logger } from '@nestjs/common';
import { HealthIndicator, HealthIndicatorResult } from '@nestjs/terminus';
import { Gauge } from 'prom-client';
import { PrometheusService } from '../../prometheus/prometheus.service';

export abstract class BaseIndicator extends HealthIndicator {
  protected abstract readonly prometheusService?: PrometheusService;

  protected abstract name: string;
  protected abstract help: string;
  protected readonly labelNames = ['status'];
  protected readonly buckets = [1];

  protected isStateConnected = false;
  protected isMetricsRegistered = false;
  protected isGaugesRegistered = false;
  callMetrics: any;
  private gauge?: Gauge<string>;

  // prometheus logic

  protected registerMetrics() {
    if (this.prometheusService) {
      Logger.log('Register metrics histogram for: ' + this.name);
      const histogram = this.prometheusService.registerMetrics(
        this.name,
        this.help,
        this.labelNames,
        this.buckets,
      );

      this.isMetricsRegistered = true;
      this.callMetrics = histogram.startTimer();
    }
  }

  protected registerGauges() {
    if (this.prometheusService) {
      Logger.log('Register metrics gauge for: ' + this.name);
      this.gauge = this.prometheusService.registerGauge(this.name, this.help);
      this.isGaugesRegistered = true;
    }
  }

  updatePrometheusData(isConnected: boolean) {
    if (this.isStateConnected !== isConnected) {
      if (isConnected) {
        Logger.log(this.name + ' is available');
      }

      this.isStateConnected = isConnected;
      const status = this.isStateConnected ? 1 : 0;

      if (this.isMetricsRegistered) {
        this.callMetrics({ status });
      }

      if (this.isGaugesRegistered) {
        this.gauge?.set(status);
      }
    }
  }

  // indicator logic

  abstract isHealthy(): Promise<HealthIndicatorResult>;

  reportUnhealthy(): HealthIndicatorResult {
    this.updatePrometheusData(false);
    return this.getStatus(this.name, false);
  }
}
