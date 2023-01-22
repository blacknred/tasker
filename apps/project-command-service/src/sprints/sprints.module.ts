import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from '@nestjs/microservices';
import { Sprint } from '@taskapp/shared';
import { getNotificationClientOptions } from '@taskapp/shared/providers/notification.provider';
import { SprintsController } from './sprints.controller';

@Module({
  imports: [
    ConfigModule,
    MikroOrmModule.forFeature([Sprint]),
    ClientsModule.registerAsync([getNotificationClientOptions()]),
  ],
  controllers: [SprintsController],
})
export class SprintsModule {}
