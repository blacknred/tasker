import { Controller, ServiceUnavailableException } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { HealthCheckResult } from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller()
export class HealthController {
  constructor(private healthService: HealthService) {}

  @MessagePattern('health')
  async check(): Promise<HealthCheckResult | undefined> {
    const healthCheckResult = await this.healthService.check();

    for (const key in healthCheckResult?.info) {
      if (healthCheckResult?.info[key].status === 'down') {
        throw new ServiceUnavailableException(healthCheckResult);
      }
    }

    return healthCheckResult;
  }
}
