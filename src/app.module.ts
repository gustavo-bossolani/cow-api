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

@Module({
  imports: [
    StatementModule,
    CategoryModule,
    AuthModule,
    OverviewModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'docker',
      password: 'docker',
      database: 'cow',
      entities: [User, Statement, Category],
      autoLoadEntities: true,
      synchronize: true,
      logging: ['query', 'error'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
