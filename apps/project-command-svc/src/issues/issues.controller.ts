import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  AllExceptionFilter,
  Auth,
  Authentication,
  GetProjectDto,
  IdResponseDto,
  Permission,
  Policy,
} from '@taskapp/shared';
import {
  CreateCommentCommand,
  CreateIssueCommand,
  CreateSubscriptionCommand,
  CreateVoteCommand,
  DeleteCommentCommand,
  DeleteIssueCommand,
  DeleteSubscriptionCommand,
  DeleteVoteCommand,
  UpdateCommentCommand,
  UpdateIssueCommand,
} from './commands';
import {
  CreateCommentDto,
  CreateIssueDto,
  DeleteCommentDto,
  DeleteIssueDto,
  UpdateCommentDto,
  UpdateIssueDto,
} from './dto';

@Authentication()
@ApiTags('Issues')
@Controller('projects')
@UseFilters(AllExceptionFilter)
export class IssuesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':pid/issues')
  @ApiOperation({ description: 'Сreate issue' })
  @ApiCreatedResponse({ type: IdResponseDto })
  @Permission(Policy.ISSUE_MANAGEMENT)
  async create(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Body() dto: CreateIssueDto,
  ): Promise<IdResponseDto> {
    const { id } = await this.commandBus.execute(
      new CreateIssueCommand(pid, dto, userId),
    );
    return { data: id };
  }

  @Patch(':pid/issues/:id')
  @ApiOperation({ description: 'Update issue' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(Policy.ISSUE_MANAGEMENT)
  async update(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
    @Body() dto: UpdateIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new UpdateIssueCommand(pid, id, dto, userId));
    return { data: id };
  }

  @Delete(':pid/issues/:id')
  @ApiOperation({ description: 'Delete issue' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(Policy.ISSUE_MANAGEMENT)
  async delete(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteIssueCommand(pid, id, userId));
    return { data: id };
  }

  @Post(':pid/issues/:id/comments')
  @ApiOperation({ description: 'Сreate issue comment' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async createComment(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
    @Body() dto: CreateCommentDto,
  ): Promise<IdResponseDto> {
    const data = await this.commandBus.execute(
      new CreateCommentCommand(pid, id, dto, userId),
    );
    return { data };
  }

  @Patch(':pid/issues/:id/comments/:cid')
  @ApiOperation({ description: 'Update issue comment' })
  @ApiOkResponse({ type: IdResponseDto })
  async updateComment(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
    @Param() { cid }: DeleteCommentDto,
    @Body() dto: UpdateCommentDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(
      new UpdateCommentCommand(pid, id, cid, dto, userId),
    );
    return { data: cid };
  }

  @Delete(':pid/issues/:id/comments/:cid')
  @ApiOperation({ description: 'Delete issue comment' })
  @ApiOkResponse({ type: IdResponseDto })
  async deleteComment(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
    @Param() { cid }: DeleteCommentDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(
      new DeleteCommentCommand(pid, id, cid, userId),
    );
    return { data: cid };
  }

  @Post(':pid/issues/:id/subscriptions')
  @ApiOperation({ description: 'Сreate issue subscription' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async createSubscription(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(
      new CreateSubscriptionCommand(pid, id, userId),
    );
    return { data: id };
  }

  @Delete(':pid/issues/:id/subscriptions')
  @ApiOperation({ description: 'Delete issue subscription' })
  @ApiOkResponse({ type: IdResponseDto })
  async deleteSubscription(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(
      new DeleteSubscriptionCommand(pid, id, userId),
    );
    return { data: id };
  }

  @Post(':pid/issues/:id/votes')
  @ApiOperation({ description: 'Сreate issue vote' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async createVote(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new CreateVoteCommand(pid, id, userId));
    return { data: id };
  }

  @Delete(':pid/issues/:id/votes')
  @ApiOperation({ description: 'Delete issue vote' })
  @ApiOkResponse({ type: IdResponseDto })
  async deleteVote(
    @Auth('userId') userId,
    @Param() { pid }: GetProjectDto,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteVoteCommand(pid, id, userId));
    return { data: id };
  }
}
