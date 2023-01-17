import { Entity, UUID } from '../types';

export interface BaseInterfaceRepository<T extends Entity> {
  create(data: T): Promise<T>;

  findOneById(id: UUID): Promise<T>;

  remove(id: UUID): Promise<boolean>;
}
