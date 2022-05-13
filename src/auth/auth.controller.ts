import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignUpCredentialsDto } from 'src/user/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from 'src/user/dto/sign-in-credentials.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SigninTokenResponseDto } from './dto/signin-token-response.dto';

@ApiTags('Auth')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpCredentials);
  }

  @ApiOperation({ summary: 'Signin user' })
  @ApiCreatedResponse({ description: 'Confirm the user creation' })
  @ApiUnauthorizedResponse({
    description: 'Wrong credentials or expired/invalid Jwt token',
  })
  @Post('/signin')
  signIn(
    @Body() signInCredentials: SignInCredentialsDto,
  ): Promise<SigninTokenResponseDto> {
    return this.authService.signIn(signInCredentials);
  }
}
