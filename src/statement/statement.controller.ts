import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';
import { StatementService } from './statement.service';

@Controller('statement')
export class StatementController {
  constructor(private statementService: StatementService) {}

  @Post()
  createStatement(@Body() createStatementDto: CreateStatementDto) {
    return this.statementService.createStatement(createStatementDto);
  }

  @Get()
  getAllStatements() {
    return this.statementService.getAllStatements();
  }

  @Delete('/:id')
  deleteStatemetnById(@Param('id') id: string, @Res() response: Response) {
    this.statementService.deleteStatemetnById(id);
    return response.status(204).send();
  }

  @Patch('/:id')
  updateStatement(
    @Body() updateStatementDto: UpdateStatementDto,
    @Param('id') id: string,
    @Res() response: Response,
  ): Response {
    this.statementService.updateStatement(updateStatementDto, id);
    return response.status(204).send();
  }
}
