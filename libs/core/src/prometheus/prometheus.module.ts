import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusService } from './prometheus.service';

@Module({
  providers: [ConfigModule, PrometheusService],
  exports: [PrometheusService],
})
export class PrometheusModule {}
