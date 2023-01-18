import { ApiProperty } from '@nestjs/swagger';
import { Expose, instanceToPlain } from 'class-transformer';
import { IsDate, IsNumber, IsUUID } from 'class-validator';

import { Transaction, UUID } from '../../../common';
import { TRANSACTION_DATE_PROPERTY } from '../entities';

/**
 * Response DTO for the transaction
 */
export class TransactionResponseDto {
  @ApiProperty({
    description: 'Unique identifier of the transaction',
    required: true,
  })
  @IsUUID()
  @Expose()
  id: UUID;

  @ApiProperty({
    description: 'Value of the transaction',
    example: 14,
    required: true,
  })
  @IsNumber()
  value: number;

  @Expose({ name: TRANSACTION_DATE_PROPERTY })
  @ApiProperty({
    description: 'Date of the transaction',
    required: true,
    name: TRANSACTION_DATE_PROPERTY,
  })
  @IsDate()
  transactionDate: Date;

  static fromEntity(transaction: Transaction): Record<string, unknown> {
    const dto = new TransactionResponseDto();
    dto.id = transaction.id;
    dto.value = transaction.value;
    dto.transactionDate = transaction.transactionDate;
    return instanceToPlain(dto);
  }
}
