import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Saga } from './entities/saga.entity';
import { SagasController } from './sagas.controller';
import { SagasService } from './sagas.service';

@Module({
  imports: [ConfigModule, MikroOrmModule.forFeature([Saga])],
  controllers: [SagasController],
  providers: [SagasService],
})
export class SagasModule {}
