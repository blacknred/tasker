import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Global()
@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
