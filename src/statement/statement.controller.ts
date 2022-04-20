import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';

import { StatementService } from './statement.service';

import { Statement } from './entities/statement.entity';

@Controller('statement')
export class StatementController {
  constructor(private statementService: StatementService) {}

  @Post()
  @HttpCode(201)
  createStatement(
    @Body() createStatementDto: CreateStatementDto,
  ): Promise<Statement> {
    return this.statementService.createStatement(createStatementDto);
  }

  @Get()
  getAllStatements() {
    return this.statementService.getAllStatements();
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteStatemetnById(@Param('id') id: string): Promise<void> {
    return this.statementService.deleteStatementById(id);
  }

  @Patch('/:id')
  updateStatement(
    @Body() updateStatementDto: UpdateStatementDto,
    @Param('id') id: string,
  ): Promise<Statement> {
    return this.statementService.updateStatement(updateStatementDto, id);
  }
}
