import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { TypeormModule } from './common';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [TypeormModule, ClientsModule, AccountsModule, TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
