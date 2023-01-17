import { BaseInterfaceRepository, UUID } from '../../common';
import { AccountEntity } from '..';

export const AccountRepositoryInterfaceToken = Symbol(
  'AccountRepositoryInterface',
);

export type UpdateOptions = {
  active: boolean;
};

export interface AccountRepositoryInterface
  extends BaseInterfaceRepository<AccountEntity> {
  updateById(id: UUID, options: UpdateOptions): Promise<AccountEntity>;
}
