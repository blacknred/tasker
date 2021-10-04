import { Catch, ExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(exception: RpcException) {
    return exception.getError();
  }
}
