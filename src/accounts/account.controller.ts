import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth';
import { ACCOUNTS_PREFIX, ACCOUNTS_TAG } from '../common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto';
import { AccountEntity } from './entities';

@ApiTags(ACCOUNTS_TAG)
@ApiBearerAuth()
@Controller(ACCOUNTS_PREFIX)
@UseGuards(JwtGuard)
export default class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  public async create(
    @Body() accountDto: CreateAccountDto,
  ): Promise<AccountEntity> {
    return await this.accountService.create(accountDto);
  }
}
