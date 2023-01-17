import { BaseInterfaceRepository } from '../../common';
import { ClientEntity } from '..';

export type SearchOptions = {
  name: string;
};

export interface ClientRepositoryInterface
  extends BaseInterfaceRepository<ClientEntity> {
  findOneByOptions(options: SearchOptions): Promise<ClientEntity>;
}
