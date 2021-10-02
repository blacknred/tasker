import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/users/interfaces/user.interface';

@Controller('health')
@Roles(Role.ADMIN)
@UseGuards(RolesGuard)
export class HealthController {
  @Get('users')
  @HttpCode(200)
  pingUserService(): string {
    return 'OK';
  }

  @Get('tasks')
  @HttpCode(500)
  pingTaskService(): string {
    return 'DEAD';
  }
}
