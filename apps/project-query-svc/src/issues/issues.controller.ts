import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AllExceptionFilter,
  Authentication,
  GetProjectDto,
} from '@taskapp/shared';
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

@Authentication()
@ApiTags('Issues')
@Controller('projects')
@UseFilters(AllExceptionFilter)
export class IssuesController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':pid/issues')
  @ApiOperation({ description: 'List all issues' })
  @ApiOkResponse({ type: IssuesResponseDto })
  async getAll(
    @Param() { pid }: GetProjectDto,
    @Query() dto: GetIssuesDto,
  ): Promise<IssuesResponseDto> {
    return this.queryBus.execute(new GetIssuesQuery(pid, dto));
  }

  @Get(':pid/issues/:id')
  @ApiOperation({ description: 'Get issue by id' })
  @ApiOkResponse({ type: IssuesResponseDto })
  async getOne(
    @Param() { pid }: GetProjectDto,
    @Param() { id }: GetIssueDto,
  ): Promise<IssueResponseDto> {
    return this.queryBus.execute(new GetIssueQuery(pid, id));
  }

  @Get(':pid/issues/:id/comments')
  @ApiOperation({ description: 'List issue comments' })
  @ApiOkResponse({ type: CommentsResponseDto })
  async getAllComments(
    @Param() { pid }: GetProjectDto,
    @Param() { id }: GetIssueDto,
  ): Promise<CommentsResponseDto> {
    return this.queryBus.execute(new GetCommentsQuery(pid, id));
  }

  @Get(':pid/issues/:id/votes')
  @ApiOperation({ description: 'Get issue votes' })
  @ApiOkResponse({ type: VotesResponseDto })
  async getAllVotes(
    @Param() { pid }: GetProjectDto,
    @Param() { id }: GetIssueDto,
  ): Promise<VotesResponseDto> {
    return this.queryBus.execute(new GetVotesQuery(pid, id));
  }

  @Get(':pid/issues/:id/subscriptions')
  @ApiOperation({ description: 'Get issue subscriptions' })
  @ApiOkResponse({ type: SubscriptionsResponseDto })
  async getaAllSubscriptions(
    @Param() { pid }: GetProjectDto,
    @Param() { id }: GetIssueDto,
  ): Promise<SubscriptionsResponseDto> {
    return this.queryBus.execute(new GetSubscriptionsQuery(pid, id));
  }
}
