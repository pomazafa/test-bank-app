import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientEntity } from 'src/clients';
import { Repository } from 'typeorm';

import { BaseAbstractRepository, UUID } from '../../../common';
import { AccountEntity, DAILY_WITHDRAWAL_LIMIT_PROPERTY } from '../../entities';
import { TRANSACTION_DATE_PROPERTY, TransactionEntity } from '..';
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

  createInTransactionScope(
    data: TransactionEntity,
    clientId: UUID,
  ): Promise<TransactionEntity> {
    return this.transactionsRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const savedTransaction = await transactionalEntityManager.save(
          TransactionEntity,
          data,
        );
        const account = await transactionalEntityManager.findOne(
          AccountEntity,
          { where: { id: data.accountId }, relations: ['ownerId'] },
        );

        this.checkAccountStatus(account);

        const owner = account.ownerId as unknown as ClientEntity;

        if (owner.id != clientId) {
          throw new ForbiddenException();
        }

        account.balance += data.value;

        this.checkFunds(account);

        this.checkDailyWithdrawLimit(data.accountId);

        transactionalEntityManager.save(AccountEntity, account);

        return savedTransaction;
      },
    );
  }

  async findManyByOptions(
    options: SearchOptions,
    clientId: UUID,
  ): Promise<TransactionEntity[]> {
    const startDate =
      options.date && new Date(options.date.toISOString().slice(0, 10));

    return this.transactionsRepository
      .createQueryBuilder('transactions')
      .leftJoinAndSelect('transactions.accountId', 'accounts')
      .leftJoinAndSelect('accounts.ownerId', 'clients')
      .where('accounts.id = :accountId', { accountId: options.accountId })
      .andWhere('clients.id = :clientId', { clientId: clientId })
      .andWhere(
        `(cast(:startDate as date) is null OR transactions.${TRANSACTION_DATE_PROPERTY} > :startDate)`,
        { startDate },
      )
      .getMany();
  }

  private checkFunds(account: AccountEntity) {
    if (account.balance < 0) {
      throw new ForbiddenException('Insufficient funds');
    }
  }

  private async checkDailyWithdrawLimit(accountId: UUID) {
    const startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);

    const result = await this.transactionsRepository
      .createQueryBuilder('transactions')
      .where('transactions.accountId = :accountId', { accountId })
      .andWhere('transactions.value < :value', { value: 0 })
      .andWhere(`transactions.${TRANSACTION_DATE_PROPERTY} > :startDate`, {
        startDate,
      })
      .select('SUM(transactions.value)')
      .getRawOne();

    if (result > DAILY_WITHDRAWAL_LIMIT_PROPERTY) {
      throw new ForbiddenException(
        'Daily withdrawal limit for the account reached',
      );
    }
  }

  private async checkAccountStatus(account: AccountEntity) {
    if (!account.active) {
      throw new ForbiddenException('Account is inactive');
    }
  }
}
