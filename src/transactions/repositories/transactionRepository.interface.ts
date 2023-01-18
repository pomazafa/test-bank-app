import { BaseInterfaceRepository, UUID } from '../../common';
import { TransactionEntity } from '..';

export const TransactionRepositoryInterfaceToken = Symbol(
  'TransactionRepositoryInterface',
);

export type SearchOptions = {
  date: Date;
  accountId: UUID;
};

export interface TransactionRepositoryInterface
  extends BaseInterfaceRepository<TransactionEntity> {
  findManyByOptions(options: SearchOptions): Promise<TransactionEntity[]>;
}
