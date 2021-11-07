import { IsMongoId, IsNumber } from 'class-validator';

export class GetWorkspaceDto {
  @IsMongoId({ message: 'Invalid identificator' })
  id: string;

  //

  @IsNumber({}, { message: 'Must be an integer' })
  uid: number;
}
