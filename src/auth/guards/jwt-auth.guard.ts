import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class SessionAuthGuard extends AuthGuard('jwt') {
  private logger = new Logger('SessionAuthGuard');

  handleRequest(_, user, info: Error) {
    if (info && info.message.includes('No auth token')) {
      this.logger.error(`No provided token. ${user}`);
      throw new UnauthorizedException('No provided token.');
    }

    if (info instanceof TokenExpiredError) {
      this.logger.error(`Expired session. ${user}`);
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Expired session.',
        expiredAccess: true,
      });
    }
    return user;
  }
}
