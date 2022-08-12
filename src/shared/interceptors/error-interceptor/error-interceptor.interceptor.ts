import { DefineError } from 'src/shared/models/define-error.model';
import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptorInterceptor implements NestInterceptor {
  private logger = new Logger('Error interceptor');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dev = process.env.ENV === 'dev';

    return next.handle().pipe(
      catchError((error: HttpException) => {
        this.logger.error(`Message ${error.message}`);

        if (dev) this.logger.error(`Stack ${error.stack}`);

        if (error.getStatus() !== 500) return throwError(() => error);

        return throwError(
          () =>
            new InternalServerErrorException(
              new DefineError('Unexpected error', 500),
            ),
        );
      }),
    );
  }
}
