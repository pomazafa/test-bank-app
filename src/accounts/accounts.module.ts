import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AccountController from './account.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './entities';
import {
  AccountRepository,
  AccountRepositoryInterfaceToken,
} from './repositories';
import { TransactionsModule } from './transactions';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity]),
    CacheModule.register(),
    TransactionsModule,
  ],
  providers: [
    {
      provide: AccountRepositoryInterfaceToken,
      useClass: AccountRepository,
    },
    AccountService,
  ],
  controllers: [AccountController],
})
export class AccountsModule {}
