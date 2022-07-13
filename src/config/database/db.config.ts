import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

import { join } from 'path';

const production = process.env.ENV === 'dev';
const logging = [production ? 'query' : '', 'error'].filter((item) => !!item);

const TypeOrmConnection: TypeOrmModuleOptions = {
  // general config
  type: 'postgres',
  autoLoadEntities: true,
  synchronize: false,
  entities: [join(__dirname, '..', '..', 'src', '**', '*.entity.{js, ts}')],
  logging: logging as LoggerOptions,

  // user config
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,

  // migrations config
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  migrationsTransactionMode: 'all',

  // cli config
  cli: {
    migrationsDir: join(__dirname, 'migrations', '*{.ts,.js}'),
  },
};

// Nestjs async config
export const TypeOrmAsyncConnection: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    const production = config.get('ENV') === 'dev';
    const logging = [production ? 'query' : '', 'error'].filter(
      (item) => !!item,
    );

    return {
      type: 'postgres',
      autoLoadEntities: true,
      synchronize: false,
      entities: [join(__dirname, '..', '..', 'src', '**', '*.entity.{js, ts}')],
      logging: logging as LoggerOptions,
      host: config.get('DATABASE_HOST'),
      port: config.get('DATABASE_PORT'),
      username: config.get('DATABASE_USERNAME'),
      password: config.get('DATABASE_PASSWORD'),
      database: config.get('DATABASE_DATABASE'),
    };
  },
};

// Typeorm general config
export const TypeOrmConfig: TypeOrmModuleOptions = TypeOrmConnection;
