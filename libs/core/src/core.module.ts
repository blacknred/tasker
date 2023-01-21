import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { LoggingModule } from './logging/logging.module';
import { MetricsModule } from './metrics/metrics.module';
import { TracingModule } from './tracing/tracing.module';

@Module({
  imports: [LoggingModule, HealthModule, MetricsModule, TracingModule],
  exports: [LoggingModule, HealthModule, MetricsModule, TracingModule],
})
export class CoreModule {}
