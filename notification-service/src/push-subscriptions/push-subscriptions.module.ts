import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PushSubscription } from './entities/push-subscription.entity';
import { PushSubscriptionsController } from './push-subscriptions.controller';
import { PushSubscriptionsService } from './push-subscriptions.service';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: [PushSubscription],
        url: configService.get('DB_URL'),
        type: 'postgres',
        logging: true,
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([PushSubscription]),
  ],
  controllers: [PushSubscriptionsController],
  providers: [PushSubscriptionsService],
})
export class PushSubscriptionsModule {}
