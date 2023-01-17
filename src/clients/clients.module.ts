import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from 'src/accounts';

import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { ClientEntity } from './entities';
import {
  ClientRepository,
  ClientRepositoryInterfaceToken,
} from './repositories';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, AccountEntity])],
  providers: [
    {
      provide: ClientRepositoryInterfaceToken,
      useClass: ClientRepository,
    },
    ClientService,
  ],
  controllers: [ClientController],
})
export class ClientsModule {}
