import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

import { DEFAULT_DAILY_WITHDRAWAL_LIMIT } from '../../common';
import {
  ACCOUNT_TYPE_PROPERTY,
  DAILY_WITHDRAWAL_LIMIT_PROPERTY,
} from '../entities';

/**
 * DTO for creating an account
 */
export class CreateAccountDto {
  @ApiProperty({
    description: 'Initial balance of the account',
    example: 12,
    required: true,
  })
  @IsNumber()
  balance: number;

  @Expose({ name: DAILY_WITHDRAWAL_LIMIT_PROPERTY })
  @ApiProperty({
    description: 'Daily withdrawal limit for the account',
    example: 100,
    required: false,
    default: DEFAULT_DAILY_WITHDRAWAL_LIMIT,
    minimum: 0,
    name: DAILY_WITHDRAWAL_LIMIT_PROPERTY,
  })
  @IsNumber()
  dailyWithdrawalLimit: number;

  @Expose({ name: ACCOUNT_TYPE_PROPERTY })
  @ApiProperty({
    description: 'Daily withdrawal limit for the account',
    example: 100,
    required: false,
    default: DEFAULT_DAILY_WITHDRAWAL_LIMIT,
    minimum: 0,
    name: ACCOUNT_TYPE_PROPERTY,
  })
  @IsPositive()
  @IsInt()
  accountType: number;
}
