import { BaseInterfaceRepository } from '../../common';
import { ClientEntity } from '..';

export const ClientRepositoryInterfaceToken = Symbol(
  'ClientRepositoryInterface',
);

export type SearchOptions = {
  name: string;
};

export interface ClientRepositoryInterface
  extends BaseInterfaceRepository<ClientEntity> {
  findOneByOptions(options: SearchOptions): Promise<ClientEntity>;
}
