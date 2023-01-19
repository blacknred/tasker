import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';

const MikroOrmConfig: Options = {
  namingStrategy: EntityCaseNamingStrategy,
  clientUrl: process.env.POSTGRES_URL,
  debug: true,
  type: 'postgresql',
  // entities: ['./dist/apps/**/*.entity.js'],
  entitiesTs: ['./libs/shared/src/entities/*.entity.ts'],
};

export default MikroOrmConfig;
