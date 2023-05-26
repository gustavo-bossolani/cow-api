import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';

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
  ApiOperationForChangePasswordMethod,
  ApiOperationForSignInMethod,
  apiOperationForSignUpMethod,
  apiResponseForChangePasswordMethod,
  apiResponseForSignInMethod,
  apiTag,
  ApiUnauthorizedResponseForChangePasswordMethod,
  apiUnauthorizedResponseForSignInMethod,
} from './config/swagger/swagger.config';

import { AuthService } from './auth.service';

import { SigninTokenResponseDto } from './dto/signin-token-response.dto';
import { SignUpCredentialsDto } from 'src/user/dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from 'src/user/dto/sign-in-credentials.dto';
import { ChangePasswordDto } from 'src/user/dto/change-password.dto';

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
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return this.authService.signUp(signUpCredentials);
  }

  @ApiOperation(ApiOperationForSignInMethod)
  @ApiUnauthorizedResponse(apiUnauthorizedResponseForSignInMethod)
  @ApiResponse(apiResponseForSignInMethod)
  // swagger
  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  signIn(
    @Body() signInCredentials: SignInCredentialsDto,
  ): Promise<SigninTokenResponseDto> {
    return this.authService.signIn(signInCredentials);
  }

  @ApiOperation(ApiOperationForChangePasswordMethod)
  @ApiUnauthorizedResponse(ApiUnauthorizedResponseForChangePasswordMethod)
  @ApiResponse(apiResponseForChangePasswordMethod)
  // swagger
  @Put('/change-password')
  @HttpCode(HttpStatus.NO_CONTENT)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    return this.authService.changePassword(changePasswordDto);
  }
}
