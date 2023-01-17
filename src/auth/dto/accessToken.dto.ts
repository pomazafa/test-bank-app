import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

const ACCESS_TOKEN_PROPERTY = 'access_token';

export class AccessTokenDto {
  @ApiProperty({
    name: ACCESS_TOKEN_PROPERTY,
    description: 'Access token of the user',
  })
  @Expose({ name: ACCESS_TOKEN_PROPERTY })
  accessToken: string;
}
