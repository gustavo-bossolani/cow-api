import { DefineError } from 'src/shared/models/define-error.model';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(signUpCredentials: SignUpCredentialsDto): void {
    const { name, password, username } = signUpCredentials;

    const found = this.users.find((user) => user.username === username);

    if (found) {
      throw new UnauthorizedException(
        new DefineError('Username already exists.', 401),
      );
    }

    const user: User = {
      id: new Date().getMilliseconds().toString(),
      name,
      password,
      username,
      statement: [],
    };

    this.users.push(user);
  }

  verifyUserCredentials(signInCredentials: SignInCredentialsDto): string {
    const { password, username } = signInCredentials;

    const user = this.users.find((user) => user.username === username);

    if (!user) {
      throw new NotFoundException(new DefineError('User not found.', 404));
    }

    if (user.password === password) {
      return 'OK';
    }

    throw new UnauthorizedException(
      new DefineError('Check user credentials', 401),
    );
  }
}
