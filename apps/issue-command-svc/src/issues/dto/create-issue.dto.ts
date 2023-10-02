import { ApiProperty } from '@nestjs/swagger';
import {
  IssuePriority,
  IssueRelation,
  IssueType,
  issueMock,
  issueStatusMock,
  issueTagMock,
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
  @ApiProperty({ type: 'string', example: 'design' })
  @MinLength(1, { message: 'Empty name' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: '#453355', required: false })
  @IsOptional()
  @IsHexColor()
  readonly color?: string;
}

class Status {
  @ApiProperty({ type: 'string', example: 'todo' })
  @MinLength(1, { message: 'Empty name' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: '#453355', required: false })
  @IsOptional()
  @IsHexColor()
  readonly color?: string;

  @ApiProperty({ type: 'boolean', example: true })
  @IsBoolean()
  readonly isFirst: boolean;

  @ApiProperty({ type: 'boolean', example: false })
  @IsBoolean()
  readonly isLast: boolean;

  @ApiProperty({
    type: 'string',
    example: 'in_process',
    isArray: true,
  })
  @IsArray({ message: 'Must be an array' })
  @MinLength(1, { message: 'Empty status name' })
  transitions: string[];
}

class Relation {
  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly issueId: string;

  @ApiProperty({
    enum: IssueRelation,
    example: IssueRelation.RELATE,
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
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
  })
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly projectId: string;

  @ApiProperty({
    enum: IssueType,
    example: IssueType.TASK,
  })
  @IsEnum(IssueType, {
    message: `Must be a one of the fields: ${Object.keys(IssueType).join(
      ', ',
    )}`,
  })
  readonly type: IssueType;

  @ApiProperty({ type: 'string', example: 'MSP:1' })
  @Length(1, 10, { message: 'Must have from 1 to 10 chars' })
  readonly name: string;

  @ApiProperty({ type: 'string', example: 'My first issue' })
  @Length(1, 100, { message: 'Must have from 1 to 100 chars' })
  readonly title: string;

  @ApiProperty({
    type: 'string',
    example: 'Very important subject',
    required: false,
  })
  @IsOptional()
  @Length(1, 1000, { message: 'Must have from 1 to 1000 chars' })
  readonly details?: string;

  @ApiProperty({
    enum: IssuePriority,
    example: IssuePriority.MEDIUM,
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
    example: '2022-08-14 13:55:16.622111',
    required: false,
  })
  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  readonly endsAt?: string;

  @ApiProperty({ type: 'number', example: 5, required: false })
  @IsOptional()
  @IsNumber()
  readonly weight?: number;

  @ApiProperty({ type: 'number', example: 2, required: false })
  @IsOptional()
  @IsNumber()
  readonly version?: number;

  @ApiProperty({
    type: 'string',
    example: ['https://path-to-file.png'],
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @IsUrl(null, { message: 'Must includes a valid ids', each: true })
  assets?: string[];

  @ApiProperty({
    type: 'string',
    example: [issueTagMock],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Must be an array' })
  @ValidateNested()
  tags?: Tag[];

  @ApiProperty({
    type: 'string',
    example: issueStatusMock,
  })
  @IsOptional()
  @ValidateNested()
  status?: Status;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly sprintId?: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
    required: false,
  })
  @IsOptional()
  @IsUUID(4, { message: 'Must be an uuid' })
  readonly epicId?: string;

  @ApiProperty({
    type: 'uuid',
    example: 'b4db61c5-d10e-4ed3-a903-b8fd75fc3d30',
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
