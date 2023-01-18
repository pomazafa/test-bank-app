import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionEntity } from './entities';
import {
  TransactionRepository,
  TransactionRepositoryInterfaceToken,
} from './repositories';
import TransactionController from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    {
      provide: TransactionRepositoryInterfaceToken,
      useClass: TransactionRepository,
    },
    TransactionService,
  ],
  controllers: [TransactionController],
})
export class TransactionsModule {}
