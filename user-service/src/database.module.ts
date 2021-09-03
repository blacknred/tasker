import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: [path.join(__dirname, './*.entity.ts')],
        url: configService.get('DB_URL'),
        type: 'postgres',
        logging: true,
        synchronize: true,
        useUTC: true,
      })
    }),
  ],
})
export class DatabaseModule {}