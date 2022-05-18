import { Body, Controller, Post } from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import {
  apiBadRequestResponseForSignUpMethod,
  apiConflictResponseForSignUpMethod,
  apiCreatedResponseForSignUpMethod,
  apiInternalServerErrorResponse,
  ApiOperationForSignInMethod,
  apiOperationForSignUpMethod,
  apiResponseForSignInMethod,
  apiTag,
  apiUnauthorizedResponseForSignInMethod,
} from './config/swagger/swagger.config';

import { AuthService } from './auth.service';

import { SigninTokenResponseDto } from './dto/signin-token-response.dto';
import { SignUpCredentialsDto } from 'src/user/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from 'src/user/dto/sign-in-credentials.dto';

@ApiTags(apiTag)
@ApiInternalServerErrorResponse(apiInternalServerErrorResponse)
//swagger
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation(apiOperationForSignUpMethod)
  @ApiCreatedResponse(apiCreatedResponseForSignUpMethod)
  @ApiConflictResponse(apiConflictResponseForSignUpMethod)
  @ApiBadRequestResponse(apiBadRequestResponseForSignUpMethod)
  // swagger
  @Post('/signup')
  signUp(@Body() signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpCredentials);
  }

  @ApiOperation(ApiOperationForSignInMethod)
  @ApiUnauthorizedResponse(apiUnauthorizedResponseForSignInMethod)
  @ApiResponse(apiResponseForSignInMethod)
  // swagger
  @Post('/signin')
  signIn(
    @Body() signInCredentials: SignInCredentialsDto,
  ): Promise<SigninTokenResponseDto> {
    return this.authService.signIn(signInCredentials);
  }
}
