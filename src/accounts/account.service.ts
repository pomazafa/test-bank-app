import { Inject, Injectable, NotFoundException } from '@nestjs/common';

import { Client, UUID } from '../common';
import { ChangeAccountStatusDto, CreateAccountDto } from './dto';
import { AccountEntity } from './entities';
import {
  AccountRepositoryInterface,
  AccountRepositoryInterfaceToken,
} from './repositories';

@Injectable()
export class AccountService {
  constructor(
    @Inject(AccountRepositoryInterfaceToken)
    private readonly accountRepository: AccountRepositoryInterface,
  ) {}

  public async create(
    accountDto: CreateAccountDto,
    client: Client,
  ): Promise<AccountEntity> {
    const account = new AccountEntity({ ...accountDto, ownerId: client.id });
    return this.accountRepository.create(account);
  }

  public async changeStatus(
    id: UUID,
    changeStatusDto: ChangeAccountStatusDto,
    client: Client,
  ): Promise<AccountEntity> {
    const account = await this.accountRepository.updateById(
      id,
      client.id,
      changeStatusDto,
    );
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }
    return account;
  }
}
