import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AccountsModule } from './accounts/accounts.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule } from './clients/clients.module';
import { TypeormModule } from './common/modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeormModule,
    ClientsModule,
    AuthModule,
    AccountsModule,
  ],
})
export class AppModule {}
