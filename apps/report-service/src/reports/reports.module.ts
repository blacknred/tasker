import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Issue } from './entities';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [MikroOrmModule.forFeature([Issue])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
