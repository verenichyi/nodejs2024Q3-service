import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { excludeFieldFromObj } from '../utils/excludeFieldFromObject';

type Response<T> = Omit<T, 'password'> | Omit<T, 'password'>[];

@Injectable()
export class ExcludePasswordInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map((user) => excludeFieldFromObj(user, 'password'));
        }

        return excludeFieldFromObj(data, 'password');
      }),
    );
  }
}
