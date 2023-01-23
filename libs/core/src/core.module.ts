import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { HealthModule } from './health/health.module';
import { LoggingModule } from './logging/logging.module';
import { MetricsModule } from './metrics/metrics.module';
import { TracingModule } from './tracing/tracing.module';

@Module({
  imports: [
    LoggingModule,
    HealthModule,
    MetricsModule,
    TracingModule,
    AuthModule,
  ],
  exports: [
    LoggingModule,
    HealthModule,
    MetricsModule,
    TracingModule,
    AuthModule,
  ],
})
export class CoreModule {}
