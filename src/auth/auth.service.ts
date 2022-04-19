import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { SignUpCredentialsDto } from 'src/user/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from 'src/user/dto/sign-in-credentials.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  signUp(signUpCredentials: SignUpCredentialsDto): void {
    return this.userService.createUser(signUpCredentials);
  }

  signIn(signInCredentials: SignInCredentialsDto): string {
    return this.userService.verifyUserCredentials(signInCredentials);
  }
}
