import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AUTH_LOGIN, AUTH_PREFIX, AUTH_TAG } from '../common';
import { AuthService } from './auth.service';
import { AccessTokenDto } from './dto/accessToken.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags(AUTH_TAG)
@Controller(AUTH_PREFIX)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post(AUTH_LOGIN)
  async login(@Body() body: LoginDto): Promise<AccessTokenDto> {
    return this.authService.login(body);
  }
}
