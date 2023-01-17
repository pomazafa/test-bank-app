import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AccountEntity } from '../../accounts';
import { Client, UUID, UUID_GENERATED_COLUMN } from '../../common';

@Entity()
export class ClientEntity implements Client {
  @PrimaryGeneratedColumn(UUID_GENERATED_COLUMN)
  id: UUID;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column()
  birthDate: Date;

  @OneToMany(() => AccountEntity, (account) => account.owner)
  accounts: AccountEntity[];
}
