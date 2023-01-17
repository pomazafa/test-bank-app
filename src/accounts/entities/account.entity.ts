import { Exclude } from 'class-transformer';
import { Min } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from '../../clients/entities';
import {
  Account,
  CURRENT_TIMESTAMP,
  DEFAULT_DAILY_WITHDRAWAL_LIMIT,
  TIMESTAMP,
  UUID,
  UUID_GENERATED_COLUMN,
} from '../../common';
import { TransactionEntity } from '../../transactions/entities';

export const DAILY_WITHDRAWAL_LIMIT_PROPERTY = 'daily_withdrawal_limit';
export const ACCOUNT_TYPE_PROPERTY = 'account_type';
export const OWNER_ID_PROPERTY = 'owner_id';

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
  @Column({
    name: DAILY_WITHDRAWAL_LIMIT_PROPERTY,
    default: DEFAULT_DAILY_WITHDRAWAL_LIMIT,
  })
  dailyWithdrawalLimit: number;

  @Column({ name: ACCOUNT_TYPE_PROPERTY })
  accountType: number;

  @Column({ type: TIMESTAMP, default: () => CURRENT_TIMESTAMP })
  createDate: Date;

  @ManyToOne(() => ClientEntity)
  @JoinColumn({ name: OWNER_ID_PROPERTY })
  @Exclude()
  ownerId: UUID;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.accountId)
  transactions: TransactionEntity[];

  constructor(account: Partial<AccountEntity>) {
    Object.assign(this, account);
  }
}
