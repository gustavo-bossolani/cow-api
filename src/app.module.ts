import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { StatementModule } from './statement/statement.module';
import { OverviewModule } from './overview/overview.module';

import { TypeOrmAsyncConnection } from './config/database/db.config';
import { configValidationSchema } from './config/schemas/config.schemas';

@Module({
  imports: [
    StatementModule,
    CategoryModule,
    AuthModule,
    OverviewModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: true, // abort on first catch error
      },
    }),
    TypeOrmModule.forRootAsync(TypeOrmAsyncConnection),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
