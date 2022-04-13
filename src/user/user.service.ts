import { DefineError } from 'src/shared/models/define-error.model';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCredentialDto } from './dto/user-credentials.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  users: User[] = [];

  createUser(createUserDto: CreateUserDto): void {
    const { name, password, username } = createUserDto;

    const user: User = {
      id: new Date().getMilliseconds().toString(),
      name,
      password,
      username,
    };

    this.users.push(user);
  }

  verifyUserCredentials(userCredentialDto: UserCredentialDto): string {
    const { password, username } = userCredentialDto;

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
