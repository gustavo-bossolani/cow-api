import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { LoggerOptions } from 'typeorm';

const production = process.env.ENV === 'dev';
const logging = [production ? 'query' : '', 'error'].filter((item) => !!item);

console.log(process.env.DATABASE_PORT);
console.log(typeof process.env.DATABASE_PORT);

export const TypeOrmConnection: TypeOrmModuleOptions = {
  // general config
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: false,
  entities: [join(__dirname, 'src', '**', '*.entity.{js, ts}')],
  logging: logging as LoggerOptions,

  // user config
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,

  // migrations config
  migrations: [
    join(__dirname, 'src', 'config', 'database', 'migrations', '*{.ts,.js}'),
  ],
  migrationsTransactionMode: 'all',

  // cli config
  cli: {
    migrationsDir: join(
      __dirname,
      'src',
      'config',
      'database',
      'migrations',
      '*{.ts,.js}',
    ),
  },
};

module.exports = TypeOrmConnection;
