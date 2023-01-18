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
  UseFilters,
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
  ACCOUNTS_PREFIX,
  ACCOUNTS_TAG,
  BALANCE_PREFIX,
  HttpExceptionFilter,
  ID_PARAMETER,
  ID_PARAMETER_NAME,
  RequestWithUser,
  UUID,
} from '../common';
import { AccountService } from './account.service';
import {
  AccountResponseDto,
  BalanceResponseDto,
  ChangeAccountStatusDto,
  CreateAccountDto,
} from './dto';

@ApiTags(ACCOUNTS_TAG)
@ApiBearerAuth()
@Controller(ACCOUNTS_PREFIX)
@UseGuards(JwtGuard)
@UseFilters(new HttpExceptionFilter())
export default class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'The account has been successfully created.',
    type: AccountResponseDto,
  })
  public async create(
    @Body() accountDto: CreateAccountDto,
    @Req() request: RequestWithUser,
  ) {
    const result = await this.accountService.create(accountDto, request.user);
    return AccountResponseDto.fromEntity(result);
  }

  @Get(`${ID_PARAMETER}/${BALANCE_PREFIX}`)
  @ApiParam({ name: ID_PARAMETER_NAME, type: String })
  @ApiOkResponse({ type: BalanceResponseDto })
  public async getById(
    @Param(ID_PARAMETER_NAME) id: UUID,
    @Req() request: RequestWithUser,
  ) {
    const result = await this.accountService.getById(id, request.user);
    return BalanceResponseDto.fromEntity(result);
  }

  @Get()
  @ApiOkResponse({ isArray: true, type: AccountResponseDto })
  public async getManyByClient(@Req() request: RequestWithUser) {
    const result = await this.accountService.getManyByClient(request.user);
    return result.map((entity) => AccountResponseDto.fromEntity(entity));
  }

  @Patch(ID_PARAMETER)
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: ID_PARAMETER_NAME, type: String })
  @ApiOkResponse({ type: AccountResponseDto })
  @ApiNotFoundResponse({ description: 'Not found' })
  public async updateStatus(
    @Body() changeStatusDto: ChangeAccountStatusDto,
    @Param(ID_PARAMETER_NAME) id: UUID,
    @Req() request: RequestWithUser,
  ) {
    const result = await this.accountService.changeStatus(
      id,
      changeStatusDto,
      request.user,
    );
    return AccountResponseDto.fromEntity(result);
  }
}
