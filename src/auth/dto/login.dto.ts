import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'name',
    example: 'Jane',
    required: true,
  })
  @IsString()
  name: string;
}
