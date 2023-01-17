import { UUID } from '../types';

interface Account {
  id: UUID;
  balance: number;
  dailyWithdrawalLimit: number;
  active: boolean;
  accountType: number;
  createDate: Date;
}

export { Account };
