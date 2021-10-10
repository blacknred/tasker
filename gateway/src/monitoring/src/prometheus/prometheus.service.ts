import { Injectable } from '@nestjs/common';
import { Registry, collectDefaultMetrics, Histogram, Gauge } from 'prom-client';

@Injectable()
export class PrometheusService {
  private readonly prefix = 'FrontendMetrics_';
  private readonly registry: Registry;
  private registeredMetrics: Record<string, Histogram<string>> = {};
  private registeredGauges: Record<string, Gauge<string>> = {};

  constructor() {
    // Create a Registry which registers the metrics
    this.registry = new Registry();

    // Add a default label which is added to all metrics
    this.registry.setDefaultLabels({
      app: 'Backend_Monitoring',
    });

    // Enable the collection of default metrics
    collectDefaultMetrics({
      register: this.registry,
      prefix: this.prefix,
    });
  }

  public get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  public removeMetric(name: string) {
    return this.registry.removeSingleMetric(name);
  }

  public clearMetrics() {
    this.registry.resetMetrics();

    return this.registry.clear();
  }

  // register custom metrics & gauges

  public registerMetrics(
    name: string,
    help: string,
    labelNames: string[],
    buckets: number[],
  ): Histogram<string> {
    if (this.registeredMetrics[name] === undefined) {
      this.registeredMetrics[name] = new Histogram({
        name,
        help,
        labelNames,
        buckets,
      });

      this.registry.registerMetric(this.registeredMetrics[name]);
    }

    return this.registeredMetrics[name];
  }

  public registerGauge(name: string, help: string): Gauge<string> {
    if (!this.registeredGauges[name]) {
      this.registeredGauges[name] = new Gauge({
        name: this.prefix + name,
        help,
      });

      this.registry.registerMetric(this.registeredGauges[name]);
    }

    return this.registeredGauges[name];
  }
}
