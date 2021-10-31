import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private errs = [];
  async transform(value: any, metadata: ArgumentMetadata): Promise<unknown> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      this.errs = [];
      this.formateErrors(errors);
      throw new RpcException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: this.errs,
      });
    }

    return value;
  }

  private formateErrors(errors: ValidationError[]) {
    for (const { children, constraints: info, property } of errors) {
      if (children?.length) {
        this.formateErrors(children);
      } else {
        this.errs.push({
          message: info ? Object.values(info).join(', ') : '',
          field: property,
        });
      }
    }
  }
}
