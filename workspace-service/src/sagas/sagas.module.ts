import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { repositoryProvider } from './providers/repository.provider';
import { SagasController } from './sagas.controller';
import { SagasService } from './sagas.service';

@Module({
  imports: [ConfigModule],
  controllers: [SagasController],
  providers: [SagasService, repositoryProvider],
})
export class SagasModule {}
