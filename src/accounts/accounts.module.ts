import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import AccountController from './account.controller';
import { AccountService } from './account.service';
import { AccountEntity } from './entities';
import {
  AccountRepository,
  AccountRepositoryInterfaceToken,
} from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity])],
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
