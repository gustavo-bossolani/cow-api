import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private logger = new Logger();

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dev = process.env.ENV === 'dev';
    const httpContext = context.switchToHttp();

    if (dev) {
      const { method, url, body } = httpContext.getRequest<Request>();
      this.logger.verbose(
        `${method} - ${url} - body: ${JSON.stringify(body)}`,
        'Logger Interceptor',
      );
    }

    return next.handle();
  }
}
