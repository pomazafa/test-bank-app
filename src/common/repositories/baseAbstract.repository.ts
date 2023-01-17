import { FindOneOptions, FindOptionsWhere, Repository } from 'typeorm';

import { Entity, UUID } from '../types';
import { BaseInterfaceRepository } from './base.interface';

export abstract class BaseAbstractRepository<T extends Entity>
  implements BaseInterfaceRepository<T>
{
  private entityRepository: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.entityRepository = repository;
  }

  public async create(data: T): Promise<T> {
    return await this.entityRepository.save(data);
  }

  public async findOneById(id: UUID): Promise<T> {
    const options: FindOneOptions = { where: { id } };
    return await this.entityRepository.findOne(options);
  }

  public async findByCondition(
    filterCondition: FindOptionsWhere<T>,
  ): Promise<T> {
    return await this.entityRepository.findOne({ where: filterCondition });
  }

  public async findAll(): Promise<T[]> {
    return await this.entityRepository.find();
  }

  public async remove(id: UUID): Promise<boolean> {
    const result = await this.entityRepository.delete(id);
    return !!result.affected;
  }
}
