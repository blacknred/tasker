import { Catch, ExceptionFilter, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

// @Catch(RpcException)
// export class RpcErrorFilter implements RpcExceptionFilter<RpcException> {
//   catch(exception: RpcException): Observable<any> {
//     console.log(44444);
    
//     return throwError(exception.getError());
//   }
// }

@Catch(RpcException)
export class RpcErrorFilter implements ExceptionFilter<RpcException> {
  catch(exception: RpcException) {
    console.log(44444);
    
    return exception.getError();
  }
}