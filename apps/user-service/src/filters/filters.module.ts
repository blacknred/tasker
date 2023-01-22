import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Filter } from './entities';
import { FiltersController } from './filters.controller';
import { FiltersService } from './filters.service';

@Module({
  imports: [MikroOrmModule.forFeature([Filter])],
  controllers: [FiltersController],
  providers: [FiltersService],
})
export class FiltersModule {}
