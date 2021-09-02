import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import path from 'path';
 
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        entities: [path.join(__dirname, './*.entity.ts')],
        url: configService.get('DATABASE_URL'),
        type: 'postgres',
        logging: true,
        synchronize: true,
        useUTC: true,
      })
    }),
  ],
})
export class DatabaseModule {}