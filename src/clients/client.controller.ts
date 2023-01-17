import { Body, Controller, Post } from '@nestjs/common';

import { CLIENTS_PREFIX } from '../common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto';
import { ClientEntity } from './entities';

@Controller(CLIENTS_PREFIX)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  public async create(
    @Body() clientDto: CreateClientDto,
  ): Promise<ClientEntity> {
    return await this.clientService.create(clientDto);
  }
}
