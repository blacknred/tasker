// import {
//   ArgumentsHost,
//   Catch,
//   ExceptionFilter,
//   HttpException,
//   RpcExceptionFilter,
// } from '@nestjs/common';
// import { RpcException } from '@nestjs/microservices';
// import { IResponse } from '../interfaces/response.interface';
// import { Observable, throwError } from 'rxjs';

// @Catch()
// export class HttpExceptionFilter implements ExceptionFilter {
//   catch(exception: any, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     // Logger.error(
//     //   `${request.method} ${request.url}`,
//     //   JSON.stringify(errorResponse),
//     //   'ExceptionFilter',
//     // );

//     if (exception instanceof RpcException) {
//       const { status, ...rest } = exception.getError() as IResponse<unknown>;
//       // response.status(status);
//       response.
//       response.json(rest);
//     }

//     if (exception instanceof HttpException) {
//       const status = exception.getStatus();
//       const resp = exception.getResponse();
//       const message = exception.getMessage();

//       response.status(status).json({
//         code: status,
//         timestamp: new Date().toTimeString(),
//         path: request.url,
//         method: request.method,
//         message: exception.message,
//         responseMessage: message,

//         message,
//         statusCode: status,
//         time: new Date().toISOString(),
//       });
//     }

//     response.status(500).json({});
//   }
// }

// // @Catch(NotFoundException)
// // export class HttpExceptionFilter implements ExceptionFilter {
// //   catch(exception: NotFoundException, host: ArgumentsHost) {
// //     const context = host.switchToHttp();
// //     const response = context.getResponse<Response>();
// //     const request = context.getRequest<Request>();
// //     const status = exception.getStatus();
// //     const message = exception.getMessage();

// //     response
// //       .status(status)
// //       .json({
// //         message,
// //         statusCode: status,
// //         time: new Date().toISOString(),
// //       });
// //   }
// // }
