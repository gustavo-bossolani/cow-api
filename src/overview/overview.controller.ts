import { User } from 'src/user/entity/user.entity';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { OverviewService } from './overview.service';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request } from '@nestjs/common';

@Controller('overview')
@UseGuards(SessionAuthGuard)
export class OverviewController {
  constructor(private service: OverviewService) {}

  @Get('/all')
  getStatementsOverViewAll(@GetUser() user: User) {
    return this.service.getStatementsOverViewAll(user);
  }

  @Get('/monthly/:month')
  getStatementsOverViewMonthly() {}
}
