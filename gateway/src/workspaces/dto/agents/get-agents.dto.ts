import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { PaginationDto } from 'src/__shared__/dto/request.dto';
import { CreateAgentDto } from './create-agent.dto';

export class GetAgentsDto extends IntersectionType(
  PartialType(CreateAgentDto),
  PaginationDto,
) {
  @ApiProperty({ example: '345234234', nullable: false })
  createdAt?: string;
}
