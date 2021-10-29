import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

export const databaseProvider: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    entities: [User],
    url: configService.get('DB_URL'),
    type: 'postgres',
    logging: true,
    synchronize: true,
    useUTC: true,
  }),
};
