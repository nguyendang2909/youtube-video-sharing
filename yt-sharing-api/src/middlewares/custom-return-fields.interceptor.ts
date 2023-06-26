import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class CustomReturnFieldsInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  logger = new Logger();

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const req = context.switchToHttp().getRequest();
    const requestLogger = {
      body: req.body,
      params: req.params,
      query: req.query,
      url: req.originalUrl,
    };
    this.logger.log(`request: ${JSON.stringify(requestLogger)}`);
    const now = Date.now();

    return next.handle().pipe(
      map((data) => {
        this.logger.log(`Consumming Time... ${Date.now() - now}ms`);
        this.logger.log(`response: ${JSON.stringify(data)}`);

        return data;
      }),
    );
  }
}
