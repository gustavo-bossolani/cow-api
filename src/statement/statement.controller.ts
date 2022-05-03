import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';

import { StatementService } from './statement.service';

import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { User } from 'src/user/entity/user.entity';
@Controller('statement')
@UseGuards(SessionAuthGuard)
export class StatementController {
  constructor(private statementService: StatementService) {}

  @Post()
  @HttpCode(201)
  createStatement(
    @Body() createStatementDto: CreateStatementDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.createStatement(createStatementDto, user);
  }

  @Get()
  getAllStatements(@GetUser() user: User) {
    return this.statementService.getAllStatements(user);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteStatemetnById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.deleteStatementById(id, user);
  }

  @Patch('/:id')
  @HttpCode(204)
  updateStatement(
    @Body() updateStatementDto: UpdateStatementDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.updateStatement(updateStatementDto, id, user);
  }
}
