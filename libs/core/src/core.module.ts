import { Module } from '@nestjs/common';
import { CqrsModule } from './cqrs/cqrs.module';
import { HealthModule } from './health/health.module';
import { LoggingModule } from './logging/logging.module';
import { MetricsModule } from './metrics/metrics.module';
import { OrmModule } from './orm/orm.module';
import { QueueModule } from './queue/queue.module';
import { RedisModule } from './redis/redis.module';
import { TracingModule } from './tracing/tracing.module';

@Module({
  imports: [
    CqrsModule,
    OrmModule,
    RedisModule,
    QueueModule,
    HealthModule,
    MetricsModule,
    TracingModule,
    LoggingModule,
  ],
  exports: [
    CqrsModule,
    OrmModule,
    RedisModule,
    QueueModule,
    HealthModule,
    MetricsModule,
    TracingModule,
    LoggingModule,
  ],
})
export class CoreModule {}
