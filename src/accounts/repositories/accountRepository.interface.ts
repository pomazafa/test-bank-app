import { BaseInterfaceRepository, UUID } from '../../common';
import { AccountEntity } from '..';

export const AccountRepositoryInterfaceToken = Symbol(
  'AccountRepositoryInterface',
);

export type SearchOneOptions = {
  id: UUID;
  clientId: UUID;
};

export type SearchManyOptions = {
  clientId: UUID;
};

export type UpdateOptions = {
  active: boolean;
};

export interface AccountRepositoryInterface
  extends BaseInterfaceRepository<AccountEntity> {
  updateById(
    id: UUID,
    clientId: UUID,
    options: UpdateOptions,
  ): Promise<AccountEntity>;

  findOneByOptions(options: SearchOneOptions): Promise<AccountEntity>;
  findManyByOptions(options: SearchManyOptions): Promise<AccountEntity[]>;
}
