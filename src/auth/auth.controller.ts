import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import {
  AUTH_LOGIN,
  AUTH_PREFIX,
  AUTH_TAG,
  HttpExceptionFilter,
} from '../common';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags(AUTH_TAG)
@Controller(AUTH_PREFIX)
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AUTH_LOGIN)
  @ApiOperation({
    summary: 'Authenticates the user',
  })
  @ApiOkResponse({
    type: AccessTokenDto,
    description: 'Access token for the user',
  })
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: LoginDto): Promise<AccessTokenDto> {
    return this.authService.login(body);
  }
}
