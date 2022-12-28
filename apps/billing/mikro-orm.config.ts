import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';

// initialize the ConfigService manually since it is not a part of a NestJS app
const configService = new ConfigService();

const MikroOrmConfig: Options = {
  namingStrategy: EntityCaseNamingStrategy,
  clientUrl: configService.get('POSTGRES_URL'),
  type: 'postgresql',
  entities: ['./dist/entities'],
  entitiesTs: ['./src/invoices/entities'],
};

export default MikroOrmConfig;
