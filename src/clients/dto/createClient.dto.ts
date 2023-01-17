import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

import { BIRTH_DATE_PROPERTY } from '../entities';

/**
 * DTO for creating a client
 */
export class CreateClientDto {
  @ApiProperty({
    description: 'Name of the user',
    example: 'Jane',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Document of the user',
    example: 'Passport',
    required: true,
  })
  @IsString()
  document: string;

  @Expose({ name: BIRTH_DATE_PROPERTY })
  @ApiProperty({
    description: 'Day of birth of the user',
    example: '2000-01-23',
    required: true,
    name: BIRTH_DATE_PROPERTY,
  })
  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}
