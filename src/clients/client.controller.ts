import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  Client,
  CLIENTS_PREFIX,
  CLIENTS_TAG,
  HttpExceptionFilter,
} from '../common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto';
import { ClientEntity } from './entities';

@ApiTags(CLIENTS_TAG)
@Controller(CLIENTS_PREFIX)
@UseFilters(new HttpExceptionFilter())
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Creates a new client',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'The client has been successfully created.',
    type: ClientEntity,
  })
  public async create(@Body() clientDto: CreateClientDto): Promise<Client> {
    return await this.clientService.create(clientDto);
  }
}
