import { Inject, Injectable } from '@nestjs/common';

import { Client, UUID } from '../../common';
import { CreateTransactionDto } from './dto';
import { TransactionEntity } from './entities';
import {
  TransactionRepositoryInterface,
  TransactionRepositoryInterfaceToken,
} from './repositories';

@Injectable()
export class TransactionService {
  constructor(
    @Inject(TransactionRepositoryInterfaceToken)
    private readonly transactionRepository: TransactionRepositoryInterface,
  ) {}

  public async create(
    transactionDto: CreateTransactionDto,
    accountId: UUID,
    client: Client,
  ): Promise<TransactionEntity> {
    const transaction = new TransactionEntity({
      ...transactionDto,
      accountId: accountId,
    });
    return this.transactionRepository.createInTransactionScope(
      transaction,
      client.id,
    );
  }

  public getManyByAccount(
    accountId: UUID,
    client: Client,
  ): Promise<TransactionEntity[]> {
    return this.transactionRepository.findManyByOptions(
      {
        accountId,
      },
      client.id,
    );
  }
}
