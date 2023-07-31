import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, fromEvent, takeUntil, tap } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class CancelProcessOnCanceledRequestInterceptor
  implements NestInterceptor
{
  private logger = new Logger('CategoryService');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    if (context.getType() !== 'http') {
      return next.handle();
    }
    const request = context.switchToHttp().getRequest() as Request;
    const close$ = fromEvent(request, 'close');

    return next.handle().pipe(takeUntil(close$));
  }
}
