import { UUID } from '../types';

interface Transaction {
  id: UUID;
  value: number;
  transactionDate: Date;
}

export { Transaction };
