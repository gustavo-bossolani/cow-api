import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StatementModule } from './statement/statement.module';

@Module({
  imports: [StatementModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
