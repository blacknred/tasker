import { Module } from '@nestjs/common';
import { SharedModule } from 'src/__shared__/shared.module';
import { MonitoringController } from './monitoring.controller';
import { monitoringProvider } from './providers/monitoring.provider';

@Module({
  imports: [SharedModule],
  controllers: [MonitoringController],
  providers: [monitoringProvider],
})
export class MonitoringModule {}
