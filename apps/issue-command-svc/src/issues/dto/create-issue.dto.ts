import { ApiProperty } from '@nestjs/swagger';
import {
  IssuePriority,
  IssueRelation,
  IssueType,
  issueMock,
} from '@taskapp/shared';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsHexColor,
  IsNumber,
  IsOptional,
  IsUUID,
  IsUrl,
  Length,
  MinLength,
  ValidateNested,
} from 'class-validator';

class Tag {
  @ApiProperty({ type: 'string', example: issueMock.tags[0].name })
  @MinLength(1, { message: 'Empty name' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.tags[0].color,
    required: false,
  })
  @IsOptional()
  @IsHexColor()
  readonly color?: string;
}

class Status {
  @ApiProperty({ type: 'string', example: issueMock.status.name })
  @MinLength(1, { message: 'Empty name' })
  readonly name: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.status.color,
    required: false,
  })
  @IsOptional()
  @IsHexColor()
  readonly color?: string;

  @ApiProperty({ type: 'boolean', example: issueMock.status.isFirst })
  @IsBoolean()
  readonly isFirst: boolean;

  @ApiProperty({ type: 'boolean', example: issueMock.status.isLast })
  @IsBoolean()
  readonly isLast: boolean;

  @ApiProperty({
    type: 'string',
    example: issueMock.status.transitions,
    isArray: true,
  })
  @IsArray({ message: 'Must be an array' })
  @MinLength(1, { message: 'Empty status name' })
  transitions: string[];
}

class Relation {
  @ApiProperty({
    type: 'uuid',
    example: issueMock.relations[0].issueId,
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly issueId: string;

  @ApiProperty({
    enum: IssueRelation,
    example: issueMock.relations[0].relation,
  })
  @IsEnum(IssueType, {
    message: `Must be a one of the fields: ${Object.keys(IssueRelation).join(
      ', ',
    )}`,
  })
  readonly relation: IssueRelation;
}

export class CreateIssueDto {
  @ApiProperty({
    enum: IssueType,
    example: issueMock.type,
  })
  @IsEnum(IssueType, {
    message: `Must be a one of the fields: ${Object.keys(IssueType).join(
      ', ',
    )}`,
  })
  readonly type: IssueType;

  @ApiProperty({ type: 'string', example: issueMock.name })
  @Length(1, 10, { message: 'Must have from 1 to 10 chars' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: issueMock.title })
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly title: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.details,
    required: false,
  })
  @IsOptional()
  @Length(1, 1000, { message: 'Must have from 1 to 1000 chars' })
  readonly details?: string;

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
    example: issueMock.endsAt,
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  readonly endsAt?: string;

  @ApiProperty({ type: 'number', example: issueMock.weight, required: false })
  @IsOptional()
  @IsNumber()
  readonly weight?: number;

  @ApiProperty({ type: 'number', example: issueMock.version, required: false })
  @IsOptional()
  @IsNumber()
  readonly version?: number;

  @ApiProperty({
    type: 'string',
    example: issueMock.assets,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsUrl(null, { message: 'Must includes a valid ids', each: true })
  assets?: string[];

  @ApiProperty({
    type: 'string',
    example: issueMock.tags,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ValidateNested()
  tags?: Tag[];

  @ApiProperty({
    type: 'string',
    example: issueMock.status,
  })
  @IsOptional()
  @ValidateNested()
  status?: Status;

  @ApiProperty({
    type: 'uuid',
    example: issueMock.sprint.id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly sprintId?: string;

  @ApiProperty({
    type: 'uuid',
    example: issueMock.epic.id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly epicId?: string;

  @ApiProperty({
    type: 'uuid',
    example: issueMock.assignee.id,
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly assigneeId?: string;

  @ApiProperty({
    type: 'string',
    example: issueMock.relations,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ValidateNested()
  relations?: Relation[];
}
