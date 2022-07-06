import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { StatementModule } from './statement/statement.module';
import { OverviewModule } from './overview/overview.module';

import { Category } from './category/entity/category.entity';
import { Statement } from './statement/entities/statement.entity';
import { User } from './user/entity/user.entity';
import { LoggerOptions } from 'typeorm';

@Module({
  imports: [
    StatementModule,
    CategoryModule,
    AuthModule,
    OverviewModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
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
          synchronize: production,
          entities: [User, Statement, Category],
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
