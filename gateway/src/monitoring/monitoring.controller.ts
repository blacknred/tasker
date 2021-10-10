import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { SharedService } from 'src/__shared__/shared.service';
import { MONITORING_SERVICE } from './consts';

@Controller('monitoring')
export class MonitoringController {
  constructor(
    private readonly monitoringService: SharedService,
    @Inject(MONITORING_SERVICE) protected readonly client: ClientProxy,
  ) {
    this.monitoringService.client = client;
  }

  @Get('health')
  async health(): Promise<unknown> {
    return this.monitoringService.feed('health');
  }

  @Get('metrics')
  async metrics(): Promise<unknown> {
    return this.monitoringService.feed('metrics');
  }
}
