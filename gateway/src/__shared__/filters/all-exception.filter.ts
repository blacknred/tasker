import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { IResponse } from '../interfaces/response.interface';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = exception.message;

    if (exception instanceof RpcException) {
      const resp = exception.getError() as IResponse<unknown>;
      response.status(resp.status).json(resp);
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.getResponse();

      response.status(status).json({
        status,
        errors: [{ field: '', message: exception.message }],
        meta: {
          path: request.url,
          time: new Date().toTimeString(),
        },
      } as IResponse<unknown>);
    } else {
      response.status(status).json({});
    }

    this.logger.error(
      `${request.method} ${request.url}`,
      JSON.stringify(message),
    );
  }
}
