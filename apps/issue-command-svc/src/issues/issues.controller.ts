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
  IdResponseDto,
  Permission,
  WorkspacePolicy,
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

// @Auth()
@ApiTags('Issues')
@Controller('issues')
@UseFilters(AllExceptionFilter)
export class IssuesController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post()
  @ApiOperation({ description: 'Сreate issue' })
  @ApiCreatedResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.ISSUE_MANAGEMENT)
  async create(
    @Auth('userId') userId,
    @Body() dto: CreateIssueDto,
  ): Promise<IdResponseDto> {
    const { id } = await this.commandBus.execute(
      new CreateIssueCommand(dto, userId),
    );
    return { data: id };
  }

  @Patch(':id')
  @ApiOperation({ description: 'Update issue' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.ISSUE_MANAGEMENT)
  async update(
    @Auth('userId') userId,
    @Param() { id }: DeleteIssueDto,
    @Body() dto: UpdateIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new UpdateIssueCommand(id, dto, userId));
    return { data: id };
  }

  @Delete(':id')
  @ApiOperation({ description: 'Delete issue' })
  @ApiOkResponse({ type: IdResponseDto })
  @Permission(WorkspacePolicy.ISSUE_MANAGEMENT)
  async delete(
    @Auth('userId') userId,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteIssueCommand(id, userId));
    return { data: id };
  }

  @Post(':id/comments')
  @ApiOperation({ description: 'Сreate issue comment' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async createComment(
    @Auth('userId') userId,
    @Param() { id }: DeleteIssueDto,
    @Body() dto: CreateCommentDto,
  ): Promise<IdResponseDto> {
    const data = await this.commandBus.execute(
      new CreateCommentCommand(id, dto, userId),
    );
    return { data };
  }

  @Patch(':id/comments/:cid')
  @ApiOperation({ description: 'Update issue comment' })
  @ApiOkResponse({ type: IdResponseDto })
  async updateComment(
    @Auth('userId') userId,
    @Param() { cid }: DeleteCommentDto,
    @Body() dto: UpdateCommentDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new UpdateCommentCommand(cid, dto, userId));
    return { data: cid };
  }

  @Delete(':id/comments/:cid')
  @ApiOperation({ description: 'Delete issue comment' })
  @ApiOkResponse({ type: IdResponseDto })
  async deleteComment(
    @Auth('userId') userId,
    @Param() { cid }: DeleteCommentDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteCommentCommand(cid, userId));
    return { data: cid };
  }

  @Post(':id/subscriptions')
  @ApiOperation({ description: 'Сreate issue subscription' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async createSubscription(
    @Auth('userId') userId,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new CreateSubscriptionCommand(id, userId));
    return { data: id };
  }

  @Delete(':id/subscriptions')
  @ApiOperation({ description: 'Delete issue subscription' })
  @ApiOkResponse({ type: IdResponseDto })
  async deleteSubscription(
    @Auth('userId') userId,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteSubscriptionCommand(id, userId));
    return { data: id };
  }

  @Post(':id/votes')
  @ApiOperation({ description: 'Сreate issue vote' })
  @ApiCreatedResponse({ type: IdResponseDto })
  async createVote(
    @Auth('userId') userId,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new CreateVoteCommand(id, userId));
    return { data: id };
  }

  @Delete(':id/votes')
  @ApiOperation({ description: 'Delete issue vote' })
  @ApiOkResponse({ type: IdResponseDto })
  async deleteVote(
    @Auth('userId') userId,
    @Param() { id }: DeleteIssueDto,
  ): Promise<IdResponseDto> {
    await this.commandBus.execute(new DeleteVoteCommand(id, userId));
    return { data: id };
  }
}
