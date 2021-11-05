import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saga } from './entities/saga.entity';
import { SagasController } from './sagas.controller';
import { SagasService } from './sagas.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Saga])],
  controllers: [SagasController],
  providers: [SagasService],
})
export class SagasModule {}
