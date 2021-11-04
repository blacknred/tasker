import { IntersectionType, PartialType } from '@nestjs/mapped-types';
import { IsMongoId } from 'class-validator';
import { AccessDto } from 'src/__shared__/dto/request.dto';
import { ObjectID } from 'typeorm';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends IntersectionType(
  PartialType(CreateRoleDto),
  AccessDto,
) {
  @IsMongoId({ message: 'Invalid identificator' })
  id: ObjectID;
}
