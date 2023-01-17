import { Inject, Injectable } from '@nestjs/common';

import { CreateAccountDto } from './dto';
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

  public async create(accountDto: CreateAccountDto): Promise<AccountEntity> {
    const account = new AccountEntity(accountDto);
    return this.accountRepository.create(account);
  }
}
