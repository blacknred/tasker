import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ISSUE_DB } from './consts';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Issue], ISSUE_DB)],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
