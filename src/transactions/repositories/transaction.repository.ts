import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';

import { BaseAbstractRepository } from '../../common';
import { TransactionEntity } from '..';
import {
  SearchOptions,
  TransactionRepositoryInterface,
} from './transactionRepository.interface';

@Injectable()
export class TransactionRepository
  extends BaseAbstractRepository<TransactionEntity>
  implements TransactionRepositoryInterface
{
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionsRepository: Repository<TransactionEntity>,
  ) {
    super(transactionsRepository);
  }
  findManyByOptions(options: SearchOptions): Promise<TransactionEntity[]> {
    return this.transactionsRepository.find({
      where: {
        transactionDate: MoreThan(
          new Date(options.date.toISOString().slice(0, 10)),
        ),
      },
    });
  }
}
