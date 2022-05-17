import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignUpCredentialsDto } from 'src/user/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from 'src/user/dto/sign-in-credentials.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SigninTokenResponseDto } from './dto/signin-token-response.dto';

@ApiTags('Auth')
@ApiInternalServerErrorResponse({ description: 'Internal server error' })
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Signup user' })
  @ApiCreatedResponse({ description: 'Confirm user creation' })
  @ApiConflictResponse({ description: 'When username is repeated' })
  @ApiBadRequestResponse({
    description: 'When username is out of range and/or  haves spaces',
  })
  // swagger
  @Post('/signup')
  signUp(@Body() signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpCredentials);
  }

  @ApiOperation({ summary: 'Signin user' })
  @ApiCreatedResponse({ description: 'Confirm the user login' })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  // swagger
  @Post('/signin')
  signIn(
    @Body() signInCredentials: SignInCredentialsDto,
  ): Promise<SigninTokenResponseDto> {
    return this.authService.signIn(signInCredentials);
  }
}
