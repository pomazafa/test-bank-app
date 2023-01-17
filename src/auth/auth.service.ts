import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ClientService } from '../clients';
import { LoginDto } from './dto';
import { AccessTokenDto } from './dto/accessToken.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private clientService: ClientService,
  ) {}

  async login(loginDto: LoginDto): Promise<AccessTokenDto> {
    const user = await this.clientService.findClientByName(loginDto.name);

    const payload = { name: user.name };
    const response: AccessTokenDto = {
      accessToken: this.jwtService.sign(payload),
    };
    return response;
  }
}
