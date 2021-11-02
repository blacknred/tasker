import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateAgentDto } from './create-agent.dto';

export class UpdateAgentDto extends PartialType(
  OmitType(CreateAgentDto, ['workspaceId', 'userId']),
) {
  @ApiProperty({ example: '5r185c3vfb991ee66b486ccb', nullable: false })
  id: string;
}
