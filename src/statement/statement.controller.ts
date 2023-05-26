import { SkipThrottle } from '@nestjs/throttler';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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

import {
  apiBadRequestResponseForCreateStatement,
  apiBadRequestResponseForGetAll,
  apiBadRequestResponseForUpdateStatement,
  apiHeaderForStatementController,
  apiInternalServerErrorResponseForStatementController,
  apiNotFoundResponseForCreateStatement,
  apiNotFoundResponseForDeleteStatement,
  apiNotFoundResponseForUpdateStatement,
  apiOperationForCreateStatement,
  apiOperationForDeleteStatement,
  apiOperationForGetAll,
  apiOperationForUpdateStatement,
  apiParamForDeleteStatement,
  apiParamForUpdateStatement,
  apiResponseForCreateStatement,
  apiResponseForDeleteStatement,
  apiResponseForGetAll,
  apiResponseForUpdateStatement,
  apiTagsForStatementController,
} from './config/swagger/swagger.config';

import { StatementService } from './statement.service';

import { ParseToNumber } from 'src/shared/pipes/parse-to-number/parse-to-number.decorator';

import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { CreateStatementDto } from './dtos/create-statement.dto';
import { UpdateStatementDto } from './dtos/update-statement.dto';
import { PaginatorOptionsDto } from 'src/shared/components/pagination/paginator-options.dto';

import { User } from 'src/user/entity/user.entity';
import { Statement } from './entities/statement.entity';
import { Page } from 'src/shared/components/pagination/page.model';

@ApiTags(apiTagsForStatementController)
@ApiBearerAuth()
@ApiHeader(apiHeaderForStatementController)
@ApiInternalServerErrorResponse(
  apiInternalServerErrorResponseForStatementController,
)
//swagger
@SkipThrottle()
@Controller('statement')
@UseGuards(SessionAuthGuard)
export class StatementController {
  constructor(private statementService: StatementService) {}

  @ApiOperation(apiOperationForCreateStatement)
  @ApiBadRequestResponse(apiBadRequestResponseForCreateStatement)
  @ApiNotFoundResponse(apiNotFoundResponseForCreateStatement)
  @ApiResponse(apiResponseForCreateStatement)
  // swagger
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createStatement(
    @Body() createStatementDto: CreateStatementDto,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.createStatement(createStatementDto, user);
  }

  @ApiOperation(apiOperationForGetAll)
  @ApiBadRequestResponse(apiBadRequestResponseForGetAll)
  @ApiResponse(apiResponseForGetAll)
  // swagger
  @Get()
  getAllStatements(
    @GetUser() user: User,
    @Query(ParseToNumber) options: PaginatorOptionsDto,
  ): Promise<Page<Statement>> {
    return this.statementService.getAllStatements(user, options);
  }

  @ApiOperation(apiOperationForDeleteStatement)
  @ApiNotFoundResponse(apiNotFoundResponseForDeleteStatement)
  @ApiParam(apiParamForDeleteStatement)
  @ApiResponse(apiResponseForDeleteStatement)
  // swagger
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteStatemetnById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.deleteStatementById(id, user);
  }

  @ApiOperation(apiOperationForUpdateStatement)
  @ApiNotFoundResponse(apiNotFoundResponseForUpdateStatement)
  @ApiBadRequestResponse(apiBadRequestResponseForUpdateStatement)
  @ApiParam(apiParamForUpdateStatement)
  @ApiResponse(apiResponseForUpdateStatement)
  // swagger
  @Patch('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  updateStatement(
    @Body() updateStatementDto: UpdateStatementDto,
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    return this.statementService.updateStatement(updateStatementDto, id, user);
  }
}
