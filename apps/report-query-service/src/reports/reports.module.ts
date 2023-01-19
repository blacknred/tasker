import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ReportsController } from './reports.controller';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([])],
  controllers: [ReportsController],
})
export class ReportsModule {}
