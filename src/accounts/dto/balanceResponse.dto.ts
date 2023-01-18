import { ApiProperty } from '@nestjs/swagger';
import { Expose, instanceToPlain } from 'class-transformer';
import { IsNumber, IsPositive, IsUUID } from 'class-validator';

import { Account, UUID } from '../../common';

/**
 * Response DTO for the balance of the account
 */
export class BalanceResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the account',
    required: true,
  })
  @IsUUID()
  @Expose()
  id: UUID;

  @ApiProperty({
    description: 'Actual balance of the acoount',
    example: 14,
    required: true,
  })
  @IsNumber()
  @IsPositive()
  balance: number;

  static fromEntity(account: Account): Record<string, unknown> {
    const dto = new BalanceResponseDto();
    dto.id = account.id;
    dto.balance = account.balance;
    return instanceToPlain(dto);
  }
}
