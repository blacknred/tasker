import { Catch, HttpStatus, Logger } from '@nestjs/common';
import { BaseRpcExceptionFilter, RpcException } from '@nestjs/microservices';
import { of } from 'rxjs';

@Catch()
export class AllExceptionFilter extends BaseRpcExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any) {
    if (exception instanceof RpcException) {
      return of(exception.getError());
    }

    this.logger.error(exception);

    return of({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  }
}
