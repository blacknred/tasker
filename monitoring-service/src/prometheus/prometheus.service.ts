import { Injectable } from '@nestjs/common';
import { Registry, collectDefaultMetrics, Histogram, Gauge } from 'prom-client';

export type PrometheusHistogram = Histogram<string>;
type MapHistogram = Record<string, Histogram<string>>;
type MapGauge = Record<string, Gauge<string>>;

@Injectable()
export class PrometheusService {
  private readonly serviceTitle = 'Backend_Monitoring';
  private readonly servicePrefix = 'FrontendMetrics_';
  private registeredMetrics: MapHistogram = {};
  private registeredGauges: MapGauge = {};
  private readonly registry: Registry;

  constructor() {
    // Create a Registry which registers the metrics
    this.registry = new Registry();

    // Add a default label which is added to all metrics
    this.registry.setDefaultLabels({
      app: this.serviceTitle,
    });

    // Enable the collection of default metrics
    collectDefaultMetrics({
      register: this.registry,
      prefix: this.servicePrefix,
    });
  }

  public get metrics(): Promise<string> {
    return this.registry.metrics();
  }

  public removeSingleMetric(name: string): void {
    return this.registry.removeSingleMetric(name);
  }

  public clearMetrics(): void {
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
      const histogram = new Histogram({ name, help, labelNames, buckets });

      this.registry.registerMetric(histogram);
      this.registeredMetrics[name] = histogram;
    }

    return this.registeredMetrics[name];
  }

  public registerGauge(name: string, help: string): Gauge<string> {
    if (this.registeredGauges[name] === undefined) {
      const gauge = (this.registeredGauges[name] = new Gauge({
        name: this.servicePrefix + name,
        help,
      }));

      this.registry.registerMetric(gauge);
      this.registeredGauges[name] = gauge;
    }

    return this.registeredGauges[name];
  }
}
