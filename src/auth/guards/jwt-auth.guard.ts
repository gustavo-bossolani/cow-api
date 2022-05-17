import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class SessionAuthGuard extends AuthGuard('jwt') {
  handleRequest(_, user, info: Error) {
    if (info && info.message.includes('No auth token')) {
      throw new UnauthorizedException('No provided token.');
    }

    if (info instanceof TokenExpiredError) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Expired session.',
        expiredAccess: true,
      });
    }
    return user;
  }
}
