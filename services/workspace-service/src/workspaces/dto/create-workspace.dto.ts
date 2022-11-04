import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateAgentDto } from 'src/agents/dto/create-agent.dto';

export class CreateWorkspaceDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(100, { message: 'Must include no more than 100 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  //
  @ValidateNested()
  creator: Omit<CreateAgentDto, 'role' | 'wid' | 'uid'>;
}
