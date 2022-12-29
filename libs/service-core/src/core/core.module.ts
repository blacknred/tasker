import { Module } from '@nestjs/common';
import { HealthModule } from './health/health.module';
import { LoggingModule } from './logging/logging.module';
import { MetricsModule } from './metrics/metrics.module';
import { TracingModule } from './tracing/tracing.module';

@Module({
  imports: [HealthModule, MetricsModule, TracingModule, LoggingModule],
  exports: [HealthModule, MetricsModule, TracingModule, LoggingModule],
})
export class CoreModule {}
