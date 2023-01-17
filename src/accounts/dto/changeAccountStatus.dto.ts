import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/**
 * DTO for changing account status
 */
export class ChangeAccountStatusDto {
  @ApiProperty({
    description: 'Account status',
    required: true,
  })
  @IsBoolean()
  active: boolean;
}
