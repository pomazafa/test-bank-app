import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientEntity } from './entities';
import {
  ClientRepository,
  ClientRepositoryInterfaceToken,
} from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity])],
  providers: [
    {
      provide: ClientRepositoryInterfaceToken,
      useClass: ClientRepository,
    },
    ClientService,
  ],
  controllers: [ClientController],
  exports: [ClientService],
})
export class ClientsModule {}
