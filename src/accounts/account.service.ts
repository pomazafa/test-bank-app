import {
  CACHE_MANAGER,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';

import { Client, DAILY_ACCOUNT_READING_LIMIT, UUID } from '../common';
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
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private configService: ConfigService,
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

  public async getById(id: UUID, client: Client): Promise<AccountEntity> {
    const limit = this.configService.get(DAILY_ACCOUNT_READING_LIMIT);
    const accountBalanceReadingCount = await this.cacheManager.get<number>(id);
    if (accountBalanceReadingCount && accountBalanceReadingCount >= limit) {
      throw new ForbiddenException('Daily account reading limit reached');
    }

    const account = await this.accountRepository.findOneByOptions({
      id,
      clientId: client.id,
    });
    if (!account) {
      throw new NotFoundException(`Account with id ${id} not found`);
    }

    const end = new Date();
    end.setUTCHours(23, 59, 59, 999);

    await this.cacheManager.set(
      id,
      accountBalanceReadingCount ? accountBalanceReadingCount + 1 : 1,
      end.getTime(),
    );
    return account;
  }

  public getManyByClient(client: Client): Promise<AccountEntity[]> {
    return this.accountRepository.findManyByOptions({
      clientId: client.id,
    });
  }
}
