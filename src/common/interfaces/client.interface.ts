import { UUID } from '../types';

interface Client {
  id: UUID;
  name: string;
  document: string;
  birthDate: Date;
}

export { Client };
