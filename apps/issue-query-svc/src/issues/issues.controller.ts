import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AllExceptionFilter } from '@taskapp/shared';
import {
  CommentsResponseDto,
  GetIssueDto,
  GetIssuesDto,
  IssueResponseDto,
  IssuesResponseDto,
  SubscriptionsResponseDto,
  VotesResponseDto,
} from './dto';
import {
  GetCommentsQuery,
  GetIssueQuery,
  GetIssuesQuery,
  GetSubscriptionsQuery,
  GetVotesQuery,
} from './queries';

@ApiTags('Issues')
@Controller('issues')
@UseFilters(AllExceptionFilter)
export class IssuesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ description: 'List all issues' })
  @ApiOkResponse({ type: IssuesResponseDto })
  async getAll(@Query() dto: GetIssuesDto): Promise<IssuesResponseDto> {
    return this.queryBus.execute(new GetIssuesQuery(dto));
  }

  @Get(':id')
  @ApiOperation({ description: 'Get issue by id' })
  @ApiOkResponse({ type: IssuesResponseDto })
  async getOne(@Param() { id }: GetIssueDto): Promise<IssueResponseDto> {
    return this.queryBus.execute(new GetIssueQuery(id));
  }

  @Get(':id/comments')
  @ApiOperation({ description: 'List issue comments' })
  @ApiOkResponse({ type: CommentsResponseDto })
  async getAllComments(
    @Param() { id }: GetIssueDto,
  ): Promise<CommentsResponseDto> {
    return this.queryBus.execute(new GetCommentsQuery(id));
  }

  @Get(':id/votes')
  @ApiOperation({ description: 'Get issue votes' })
  @ApiOkResponse({ type: VotesResponseDto })
  async getAllVotes(@Param() { id }: GetIssueDto): Promise<VotesResponseDto> {
    return this.queryBus.execute(new GetVotesQuery(id));
  }

  @Get(':id/subscriptions')
  @ApiOperation({ description: 'Get issue subscriptions' })
  @ApiOkResponse({ type: SubscriptionsResponseDto })
  async getaAllSubscriptions(
    @Param() { id }: GetIssueDto,
  ): Promise<SubscriptionsResponseDto> {
    return this.queryBus.execute(new GetSubscriptionsQuery(id));
  }
}
