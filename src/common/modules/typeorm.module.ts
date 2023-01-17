import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNCHRONIZE,
  DB_TYPE,
  DB_USERNAME,
} from '../constants';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: DB_TYPE,
        host: configService.get(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get(DB_USERNAME),
        password: configService.get(DB_PASSWORD),
        database: configService.get(DB_NAME),
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: !!configService.get(DB_SYNCHRONIZE),
        // synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
