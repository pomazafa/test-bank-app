import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';

@Module({
  imports: [ClientsModule, UsersModule, AccountsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
