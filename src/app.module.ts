import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatementModule } from './statement/statement.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [StatementModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
