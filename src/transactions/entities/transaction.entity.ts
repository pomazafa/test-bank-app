import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { AccountEntity } from '../../accounts';
import {
  CURRENT_TIMESTAMP,
  TIMESTAMP,
  Transaction,
  UUID,
  UUID_GENERATED_COLUMN,
} from '../../common';

@Entity()
export class TransactionEntity implements Transaction {
  @PrimaryGeneratedColumn(UUID_GENERATED_COLUMN)
  id: UUID;

  @Column()
  value: number;

  @Column({ type: TIMESTAMP, default: () => CURRENT_TIMESTAMP })
  transactionDate: Date;

  @ManyToOne(() => AccountEntity, (account) => account.transactions)
  account: AccountEntity;
}
