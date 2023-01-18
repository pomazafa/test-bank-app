import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

/**
 * DTO for creating a transaction
 */
export class CreateTransactionDto {
  @ApiProperty({
    description: 'Value of the transaction',
    example: 12,
    required: true,
  })
  @IsNumber()
  value: number;
}
