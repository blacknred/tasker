import { PartialType } from '@nestjs/mapped-types';
import { OmitType } from '@nestjs/swagger';
import { CreateStatusDto } from './create-status.dto';

export class UpdateStatusDto extends PartialType(
  OmitType(CreateStatusDto, ['projectId']),
) {}
