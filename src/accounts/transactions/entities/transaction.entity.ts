import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import {
  CURRENT_TIMESTAMP,
  TIMESTAMP,
  Transaction,
  UUID,
  UUID_GENERATED_COLUMN,
} from '../../../common';
import { AccountEntity } from '../../entities';

export const TRANSACTION_DATE_PROPERTY = 'transaction_date';
export const ACCOUNT_ID_PROPERTY = 'account_id';

@Entity()
export class TransactionEntity implements Transaction {
  @PrimaryGeneratedColumn(UUID_GENERATED_COLUMN)
  id: UUID;

  @Column()
  value: number;

  @Column({
    name: TRANSACTION_DATE_PROPERTY,
    type: TIMESTAMP,
    default: () => CURRENT_TIMESTAMP,
  })
  transactionDate: Date;

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  @JoinColumn({ name: ACCOUNT_ID_PROPERTY })
  @Exclude()
  accountId: UUID;

  constructor(transaction: Partial<TransactionEntity>) {
    Object.assign(this, transaction);
  }
}
