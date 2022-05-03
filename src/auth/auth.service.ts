import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';

import { SignInCredentialsDto } from 'src/user/dto/sign-in-credentials.dto';
import { SignUpCredentialsDto } from 'src/user/dto/sign-up-credentials.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return await this.userService.createUser(signUpCredentials);
  }

  async signIn(
    signInCredentials: SignInCredentialsDto,
  ): Promise<{ access: string }> {
    const { username } = await this.userService.verifyUserCredentials(
      signInCredentials,
    );

    const access = await this.jwtService.sign({ username });
    return { access };
  }
}
