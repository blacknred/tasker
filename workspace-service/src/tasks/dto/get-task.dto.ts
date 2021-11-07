import { IsMongoId } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';

export class GetTaskDto extends AccessDto {
  @IsMongoId({ message: 'Invalid identificator' })
  id: string;
}
