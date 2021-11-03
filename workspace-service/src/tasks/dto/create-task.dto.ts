import {
  IsDateString,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';
import { TaskPriority, TaskType } from '../interfaces/task.interface';

export class CreateTaskDto extends AccessDto {
  @IsString({ message: 'Must be a string' })
  @MinLength(5, { message: 'Must include atleast 5 chars' })
  @MaxLength(500, { message: 'Must include no more than 500 chars' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Must be a string' })
  description?: string;

  @IsEnum(TaskType, {
    message: `Must be one of ${Object.values(TaskType)}`,
  })
  type: TaskType;

  @IsEnum(TaskPriority, {
    message: `Must be one of ${Object.values(TaskPriority)}`,
  })
  priority: TaskPriority;

  @IsOptional()
  @IsDateString({}, { message: 'Must be a date string' })
  expiresAt?: string;

  @IsOptional()
  @IsMongoId({ message: 'Invalid identificator' })
  sagaId?: ObjectID;
}
