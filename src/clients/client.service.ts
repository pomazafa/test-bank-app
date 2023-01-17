import { Inject, Injectable } from '@nestjs/common';

import { CreateClientDto } from './dto';
import { ClientEntity } from './entities';
import {
  ClientRepositoryInterface,
  ClientRepositoryInterfaceToken,
} from './repositories';

@Injectable()
export class ClientService {
  constructor(
    @Inject(ClientRepositoryInterfaceToken)
    private readonly clientRepository: ClientRepositoryInterface,
  ) {}

  public async create(clientDto: CreateClientDto): Promise<ClientEntity> {
    const client = new ClientEntity(clientDto);
    return this.clientRepository.create(client);
  }
}
