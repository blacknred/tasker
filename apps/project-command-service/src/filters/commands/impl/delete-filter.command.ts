import { ICommand } from '@nestjs/cqrs';
import { DeleteFilterDto } from '../../dto/delete-filter.dto';

export class DeleteFilterCommand implements ICommand {
  constructor(public readonly id: DeleteFilterDto['id']) {}
}
