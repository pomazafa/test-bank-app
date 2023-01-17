import { Min } from 'class-validator';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from '../../clients';
import {
  Account,
  CURRENT_TIMESTAMP,
  DEFAULT_DAILY_WITHDRAWAL_LIMIT,
  TIMESTAMP,
  UUID,
  UUID_GENERATED_COLUMN,
} from '../../common';
import { TransactionEntity } from '../../transactions';

@Entity()
export class AccountEntity implements Account {
  @PrimaryGeneratedColumn(UUID_GENERATED_COLUMN)
  id: UUID;

  @Min(0)
  @Column()
  balance: number;

  @Column({ default: true })
  active: boolean;

  @Min(0)
  @Column({ default: DEFAULT_DAILY_WITHDRAWAL_LIMIT })
  dailyWithdrawalLimit: number;

  @Column()
  accountType: number;

  @Column({ type: TIMESTAMP, default: () => CURRENT_TIMESTAMP })
  createDate: Date;

  @ManyToOne(() => ClientEntity, (owner) => owner.accounts)
  owner: ClientEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];

  constructor(account: Partial<AccountEntity>) {
    this.balance = account.balance;
    this.accountType = account.accountType;
    this.dailyWithdrawalLimit = account.dailyWithdrawalLimit;
  }
}
