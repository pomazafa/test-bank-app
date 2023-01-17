import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CLIENTS_PREFIX, CLIENTS_TAG } from '../common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto';
import { ClientEntity } from './entities';

@ApiTags(CLIENTS_TAG)
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
