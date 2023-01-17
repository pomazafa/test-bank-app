import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { Client, CLIENTS_PREFIX, CLIENTS_TAG } from '../common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto';
import { ClientEntity } from './entities';

@ApiTags(CLIENTS_TAG)
@Controller(CLIENTS_PREFIX)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The client has been successfully created.',
    type: ClientEntity,
  })
  public async create(@Body() clientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(clientDto);
  }
}
