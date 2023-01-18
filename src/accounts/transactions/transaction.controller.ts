import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../../auth';
import {
  ACCOUNTS_PREFIX,
  HttpExceptionFilter,
  ID_PARAMETER,
  ID_PARAMETER_NAME,
  RequestWithUser,
  TRANSACTIONS_PREFIX,
  TRANSACTIONS_TAG,
  UUID,
} from '../../common';
import { CreateTransactionDto, TransactionResponseDto } from './dto';
import { TransactionService } from './transaction.service';

@ApiTags(TRANSACTIONS_TAG)
@ApiBearerAuth()
@Controller(`${ACCOUNTS_PREFIX}/${ID_PARAMETER}/${TRANSACTIONS_PREFIX}`)
@UseGuards(JwtGuard)
@UseFilters(new HttpExceptionFilter())
export default class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The transaction has been successfully created.',
    type: TransactionResponseDto,
  })
  public async create(
    @Body() transactionDto: CreateTransactionDto,
    @Param(ID_PARAMETER_NAME) id: UUID,
    @Req() request: RequestWithUser,
  ) {
    const transaction = await this.transactionService.create(
      transactionDto,
      id,
      request.user,
    );
    return TransactionResponseDto.fromEntity(transaction);
  }

  @Get()
  @ApiOkResponse({
    description: 'Transactions related to the account',
    type: TransactionResponseDto,
    isArray: true,
  })
  public async findAll(
    @Param(ID_PARAMETER_NAME) id: UUID,
    @Req() request: RequestWithUser,
  ) {
    const result = await this.transactionService.getManyByAccount(
      id,
      request.user,
    );
    return result.map((transaction) =>
      TransactionResponseDto.fromEntity(transaction),
    );
  }
}
