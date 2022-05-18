import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';

import { StatementService } from './statement.service';

import { ParseToNumber } from 'src/shared/pipes/parse-to-number/parse-to-number.decorator';

import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { User } from 'src/user/entity/user.entity';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';
import { Statement } from './entities/statement.entity';
import { Page } from 'src/shared/components/pagination/page.model';

@ApiTags('Statement')
@ApiBearerAuth()
@ApiHeader({ name: 'Authorization', example: 'Bearer token' })
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
//swagger
@Controller('statement')
@UseGuards(SessionAuthGuard)
export class StatementController {
  constructor(private statementService: StatementService) {}

  @ApiOperation({ summary: 'Create statement for a user.' })
  @ApiBadRequestResponse({
    description: 'If CreateStatementDto rules is not respected',
  })
  @ApiNotFoundResponse({
    description:
      'Return only if a category id is passed, when it is the system will try to find a category with provided id',
  })
  @ApiResponse({ status: 201, description: 'Statement created' })
  // swagger
  @Post()
  @HttpCode(201)
  createStatement(
    @Body() createStatementDto: CreateStatementDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.createStatement(createStatementDto, user);
  }

  @ApiOperation({ summary: 'Recover all statements with paginator' })
  @ApiBadRequestResponse({
    description: 'If PaginatorOptionsDto rules is not respected',
  })
  @ApiResponse({ status: 200, description: 'Statement created', type: Page })
  // swagger
  @Get()
  getAllStatements(
    @GetUser() user: User,
    @Query(ParseToNumber) options: PaginatorOptionsDto,
  ): Promise<Page<Statement>> {
    return this.statementService.getAllStatements(user, options);
  }

  @ApiOperation({ summary: 'Delete a statement for a given id' })
  @ApiNotFoundResponse({
    description: 'When statement is not found for the given id',
  })
  @ApiParam({ name: 'id', example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e' })
  @ApiResponse({ status: 204, description: 'Statement deleted' })
  // swagger
  @Delete('/:id')
  @HttpCode(204)
  deleteStatemetnById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.deleteStatementById(id, user);
  }

  @ApiOperation({ summary: 'Update a statement for a given id' })
  @ApiNotFoundResponse({
    description: 'When statement is not found for the given id',
  })
  @ApiBadRequestResponse({
    description: 'If UpdateStatementDto rules is not respected',
  })
  @ApiParam({ name: 'id', example: 'fa817897-ec03-4cb3-abb2-b02aba60cc0e' })
  @ApiResponse({ status: 204, description: 'Statement deleted' })
  // swagger
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
