import { Module } from '@nestjs/common';

import { OverviewController } from './overview.controller';

import { StatementModule } from './../statement/statement.module';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { OverviewService } from './overview.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, StatementModule, CategoryModule, AuthModule],
  controllers: [OverviewController],
  providers: [OverviewService],
})
export class OverviewModule {}
