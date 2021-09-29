import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<unknown> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      return {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: errors.map((err) => ({
          message: Object.values(err.constraints).join(', '),
          field: err.property,
        })),
      };
      throw new RpcException('');
    }

    return value;
  }
}
