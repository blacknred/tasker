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

@Catch()
export class AllExceptionFilter<T> implements ExceptionFilter<T> {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let errors = null;

    if (exception instanceof TimeoutError) {
      status = HttpStatus.REQUEST_TIMEOUT;
      errors = [exception.message];
    } else if (exception instanceof HttpException) {
      const error = exception.getResponse() as any;
      status = exception.getStatus();
      errors = error.errors || [error.error];
    } else {
      this.logger.error(`${request.method} ${request.url}`, exception.message);
    }

    response.status(status).json({
      errors,
      meta: {
        path: request.url,
        time: new Date().toTimeString(),
      },
    });
  }
}
