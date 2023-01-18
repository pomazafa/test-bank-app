import { ApiProperty } from '@nestjs/swagger';
import { Expose, instanceToPlain } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsPositive,
  IsUUID,
} from 'class-validator';

import { Account, UUID } from '../../common';
import {
  ACCOUNT_TYPE_PROPERTY,
  DAILY_WITHDRAWAL_LIMIT_PROPERTY,
} from '../entities';

/**
 * Response DTO for the account
 */
export class AccountResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the account',
    required: true,
  })
  @IsUUID()
  @Expose()
  id: UUID;

  @ApiProperty({
    description: 'Account status',
    example: true,
    required: true,
  })
  @IsBoolean()
  active: boolean;

  @ApiProperty({
    description: 'Daily withdrawal limit for the account',
    example: 100,
    required: true,
    minimum: 0,
    name: DAILY_WITHDRAWAL_LIMIT_PROPERTY,
  })
  @IsNumber()
  @Expose({ name: DAILY_WITHDRAWAL_LIMIT_PROPERTY })
  dailyWithdrawalLimit: number;

  @ApiProperty({
    description: 'Type of the account',
    example: 1,
    required: true,
    minimum: 0,
    name: ACCOUNT_TYPE_PROPERTY,
  })
  @IsPositive()
  @IsInt()
  @Expose({ name: ACCOUNT_TYPE_PROPERTY })
  accountType: number;

  static fromEntity(account: Account): Record<string, unknown> {
    const dto = new AccountResponseDto();
    dto.accountType = account.accountType;
    dto.dailyWithdrawalLimit = account.dailyWithdrawalLimit;
    dto.id = account.id;
    dto.active = account.active;
    return instanceToPlain(dto);
  }
}
