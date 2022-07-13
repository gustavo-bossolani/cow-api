import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
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
          entities: [
            join(__dirname, '..', '..', 'src', '**', '*.entity.{js, ts}'),
          ],
          logging: logging as LoggerOptions,
          host: config.get('DATABASE_HOST'),
          port: config.get('DATABASE_PORT'),
          username: config.get('DATABASE_USERNAME'),
          password: config.get('DATABASE_PASSWORD'),
          database: config.get('DATABASE_DATABASE'),
        };
      },
    }),
  ],
})
export class DatabaseModule {}
