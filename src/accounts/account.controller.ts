import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';

import { JwtGuard } from '../auth';
import {
  ACCOUNTS_PREFIX,
  ACCOUNTS_TAG,
  ID_PARAMETER,
  ID_PARAMETER_NAME,
  RequestWithUser,
  UUID,
} from '../common';
import { AccountService } from './account.service';
import { ChangeAccountStatusDto, CreateAccountDto } from './dto';
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
    @Req() request: RequestWithUser,
  ): Promise<AccountEntity> {
    return await this.accountService.create(accountDto, request.user);
  }

  @Patch(ID_PARAMETER)
  @ApiParam({ name: ID_PARAMETER_NAME, type: String })
  public async updateStatus(
    @Body() changeStatusDto: ChangeAccountStatusDto,
    @Param(ID_PARAMETER_NAME) id: UUID,
    @Req() request: RequestWithUser,
  ): Promise<AccountEntity> {
    return await this.accountService.changeStatus(
      id,
      changeStatusDto,
      request.user,
    );
  }
}
