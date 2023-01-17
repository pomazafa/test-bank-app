import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BaseAbstractRepository } from '../../common';
import { ClientEntity } from '..';
import {
  ClientRepositoryInterface,
  SearchOptions,
} from './clientRepository.interface';

@Injectable()
export class ClientRepository
  extends BaseAbstractRepository<ClientEntity>
  implements ClientRepositoryInterface
{
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientsRepository: Repository<ClientEntity>,
  ) {
    super(clientsRepository);
  }

  findOneByOptions(options: SearchOptions): Promise<ClientEntity> {
    return this.clientsRepository.findOneBy(options);
  }
}
