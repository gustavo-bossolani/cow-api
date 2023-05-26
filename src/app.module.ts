import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './config/database/database.module';
import { CategoryModule } from './category/category.module';
import { StatementModule } from './statement/statement.module';
import { OverviewModule } from './overview/overview.module';

import { configValidationSchema } from './config/schemas/config.schemas';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
@Module({
  imports: [
    StatementModule,
    CategoryModule,
    AuthModule,
    OverviewModule,
    DatabaseModule,
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
      validationOptions: {
        abortEarly: true, // abort on first catch error
      },
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
