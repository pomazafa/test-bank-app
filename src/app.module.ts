import { Module } from '@nestjs/common';

import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TypeormModule } from './common/modules';

@Module({
  imports: [TypeormModule, ClientsModule, AuthModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
