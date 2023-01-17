import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository, UUID } from '../../common';
import { AccountEntity } from '..';
import {
  AccountRepositoryInterface,
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

  async updateById(id: UUID, options: UpdateOptions): Promise<AccountEntity> {
    await this.accountsRepository.update(id, options);
    return this.findOneById(id);
  }
}
