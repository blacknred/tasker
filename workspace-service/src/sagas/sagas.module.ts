import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { sagaRepositoryProvider } from './providers/saga-repository.provider';
import { SagasController } from './sagas.controller';
import { SagasService } from './sagas.service';

@Module({
  imports: [ConfigModule],
  controllers: [SagasController],
  providers: [SagasService, sagaRepositoryProvider],
})
export class SagasModule {}
