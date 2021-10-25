import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TimeoutError } from 'rxjs';
import { IResponse } from '../interfaces/response.interface';

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter<T> {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    console.log(9999, exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let payload: IResponse<T> = {};

    if (exception instanceof TimeoutError) {
      status = HttpStatus.REQUEST_TIMEOUT;
      payload.message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse() as any;
      if (!res.message) payload = res;
      else payload.message = res.message;
    } else {
      this.logger.error(`${request.method} ${request.url}`, exception);
    }

    response.status(status).json({
      ...payload,
      meta: {
        path: request.url,
        time: new Date().toTimeString(),
      },
    });
  }
}
