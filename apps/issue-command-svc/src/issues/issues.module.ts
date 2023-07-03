import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IssuesController } from './issues.controller';
import { IssuesService } from './issues.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Issue])],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
