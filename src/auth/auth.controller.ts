import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignUpCredentialsDto } from 'src/user/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from 'src/user/dto/sign-in-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpCredentials);
  }

  @Post('/signin')
  signIn(
    @Body() signInCredentials: SignInCredentialsDto,
  ): Promise<{ access: string }> {
    return this.authService.signIn(signInCredentials);
  }
}
