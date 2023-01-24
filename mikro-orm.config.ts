import type { Options } from '@mikro-orm/core';
import { EntityCaseNamingStrategy } from '@mikro-orm/core';
import { EntityGenerator } from '@mikro-orm/entity-generator';
import { Migrator } from '@mikro-orm/migrations';

const MikroOrmConfig: Options = {
  namingStrategy: EntityCaseNamingStrategy,
  clientUrl: process.env.POSTGRES_URL,
  debug: process.env.NODE_ENV == 'development',
  type: 'postgresql',
  entities: ['./dist/apps/src/**/entities/*.entity.js'],
  entitiesTs: ['./apps/src/**/entities/*.entity.ts'],
  extensions: [Migrator, EntityGenerator],
  migrations: {
    tableName: 'orm_migrations',
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{js,ts}',
    allOrNothing: true,
  },
};

export default MikroOrmConfig;
