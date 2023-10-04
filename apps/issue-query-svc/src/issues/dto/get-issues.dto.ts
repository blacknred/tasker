import { OmitType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IssuePriority,
  IssueType,
  PaginatedRequestDto,
  issueMock,
} from '@taskapp/shared';
import {
  IsDateString,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class GetIssuesDto extends OmitType(PaginatedRequestDto, [
  'sort.field',
]) {
  @ApiProperty({ type: 'string', example: 'createdAt', required: false })
  @IsOptional()
  @IsIn(
    [
      'name',
      'type',
      'priority',
      'epic',
      'assignee',
      'sprint',
      'votesCount',
      'subscriptionCount',
      'endsAt',
      'createdAt',
    ],
    {
      message:
        'Must be a one of the fields: name, type, priority, epic, assignee, sprint, votesCount, subscriptionCount, endsAt, createdAt',
    },
  )
  readonly 'sort.field'?:
    | 'name'
    | 'type'
    | 'priority'
    | 'epic'
    | 'assignee'
    | 'sprint'
    | 'votesCount'
    | 'subscriptionCount'
    | 'endsAt'
    | 'createdAt';

  @ApiProperty({
    type: 'uuid',
    example: issueMock.projectId,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId: string;

  @ApiProperty({ type: 'string', example: issueMock.name, required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  readonly name?: string;

  @ApiProperty({ type: 'string', example: issueMock.title, required: false })
  @IsOptional()
  @Length(0, 100, { message: 'Must have up to 100 chars' })
  readonly title?: string;

  @ApiProperty({
    enum: IssueType,
    example: issueMock.type,
    required: false,
  })
  @IsOptional()
  @IsEnum(IssueType, {
    message: `Must be a one of the fields: ${Object.keys(IssueType).join(
      ', ',
    )}`,
  })
  readonly type?: IssueType;

  @ApiProperty({
    enum: IssuePriority,
    example: issueMock.priority,
    required: false,
  })
  @IsOptional()
  @IsEnum(IssuePriority, {
    message: `Must be a one of the fields: ${Object.keys(IssuePriority).join(
      ', ',
    )}`,
  })
  readonly priority?: IssuePriority;

  @ApiProperty({
    type: 'string',
    example: issueMock.status.name,
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly status?: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.tags[0].name,
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly tag?: string;

  @ApiProperty({
    type: 'uuid',
    example: issueMock.epic.id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly epicId: string;

  @ApiProperty({
    type: 'uuid',
    example: issueMock.sprint.id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly sprintId: string;

  @ApiProperty({
    type: 'uuid',
    example: issueMock.author.id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly authorId: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.endsAt,
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  readonly endsAt?: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.createdAt,
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  readonly createdAt?: string;
}
