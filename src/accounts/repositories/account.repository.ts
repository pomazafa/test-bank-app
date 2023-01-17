import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository, UUID } from '../../common';
import { AccountEntity } from '..';
import {
  AccountRepositoryInterface,
  SearchOptions,
  UpdateOptions,
} from './accountRepository.interface';

@Injectable()
export class AccountRepository
  extends BaseAbstractRepository<AccountEntity>
  implements AccountRepositoryInterface
{
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountsRepository: Repository<AccountEntity>,
  ) {
    super(accountsRepository);
  }

  async updateById(
    id: UUID,
    clientId: UUID,
    options: UpdateOptions,
  ): Promise<AccountEntity> {
    const account = await this.findOneByOptions({ id, clientId });
    if (!account) {
      return;
    }
    return this.accountsRepository.save({ ...account, ...options });
  }

  findOneByOptions(options: SearchOptions): Promise<AccountEntity> {
    return this.accountsRepository
      .createQueryBuilder('accounts')
      .leftJoinAndSelect('accounts.ownerId', 'clients')
      .where('accounts.id = :id', { id: options.id })
      .andWhere('clients.id = :clientId', { clientId: options.clientId })
      .getOne();
  }
}
