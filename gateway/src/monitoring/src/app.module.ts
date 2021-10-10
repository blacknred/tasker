import Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { PrometheusModule } from './prometheus/prometheus.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      validationSchema: Joi.object({
        // QUEUE_URL: Joi.string().required(),
        // DB_URL: Joi.string().required(),
      }),
    }),
    HealthModule,
    PrometheusModule,
    MetricsModule,
  ],
})
export class AppModule {}
