import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

import { JwtGuard } from '../auth';
import {
  Account,
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
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The account has been successfully created.',
    type: AccountEntity,
  })
  public async create(
    @Body() accountDto: CreateAccountDto,
    @Req() request: RequestWithUser,
  ): Promise<Account> {
    return await this.accountService.create(accountDto, request.user);
  }

  @Get(ID_PARAMETER)
  @ApiParam({ name: ID_PARAMETER_NAME, type: String })
  @ApiOkResponse({ type: AccountEntity })
  public async getById(
    @Param(ID_PARAMETER_NAME) id: UUID,
    @Req() request: RequestWithUser,
  ): Promise<Account> {
    return await this.accountService.getById(id, request.user);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: AccountEntity })
  public async getManyByClient(
    @Req() request: RequestWithUser,
  ): Promise<Account[]> {
    return await this.accountService.getManyByClient(request.user);
  }

  @Patch(ID_PARAMETER)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: ID_PARAMETER_NAME, type: String })
  @ApiOkResponse({ type: AccountEntity })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async updateStatus(
    @Body() changeStatusDto: ChangeAccountStatusDto,
    @Param(ID_PARAMETER_NAME) id: UUID,
    @Req() request: RequestWithUser,
  ): Promise<Account> {
    return await this.accountService.changeStatus(
      id,
      changeStatusDto,
      request.user,
    );
  }
}
