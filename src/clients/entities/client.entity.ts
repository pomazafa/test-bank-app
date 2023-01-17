import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { AccountEntity } from '../../accounts/entities';
import { Client, UUID, UUID_GENERATED_COLUMN } from '../../common';

export const BIRTH_DATE_PROPERTY = 'birth_date';
const NAME_PROPERTY = 'name';

@Entity()
@Unique([NAME_PROPERTY])
export class ClientEntity implements Client {
  @PrimaryGeneratedColumn(UUID_GENERATED_COLUMN)
  id: UUID;

  @Column()
  name: string;

  @Column()
  document: string;

  @Column({ name: BIRTH_DATE_PROPERTY })
  birthDate: Date;

  @OneToMany(() => AccountEntity, (account) => account.ownerId)
  accounts: AccountEntity[];

  constructor(client: Partial<ClientEntity>) {
    Object.assign(this, client);
  }
}
