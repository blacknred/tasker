import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, map, timeout } from 'rxjs/operators';
import { REQUEST_TIMEOUT } from '../consts';

@Injectable()
export class ProxyInterceptor<T> implements NestInterceptor<T> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<T> {
    const startAt = Date.now();

    return next.handle().pipe(
      // timeout
      timeout(REQUEST_TIMEOUT),
      // transform
      map<T, any>((payload) => ({
        ...payload,
        meta: {
          lag: Date.now() - startAt + 'ms',
        },
      })),
      // exception map
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(new HttpException(err, err.status));
      }),
    );
  }
}
// return zip(...reqs).pipe(map((resps) => ({ ...resps })));
