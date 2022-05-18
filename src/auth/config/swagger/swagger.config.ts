import { ApiOperationOptions, ApiResponseOptions } from '@nestjs/swagger';

import { SigninTokenResponseDto } from 'src/auth/dto/signin-token-response.dto';

// Controller
const apiTag = 'Auth';

// Sign up
const apiInternalServerErrorResponse: ApiResponseOptions = {
  description: 'Internal server error',
};
const apiOperationForSignUpMethod: ApiOperationOptions = {
  summary: 'Signup user',
};
const apiCreatedResponseForSignUpMethod: ApiResponseOptions = {
  description: 'Confirm user creation',
};
const apiConflictResponseForSignUpMethod: ApiResponseOptions = {
  description: 'When username is repeated',
};
const apiBadRequestResponseForSignUpMethod: ApiResponseOptions = {
  description: 'When username is out of range and/or  haves spaces',
};

// Sign in
const ApiOperationForSignInMethod: ApiOperationOptions = {
  summary: 'Signin user',
};
const apiUnauthorizedResponseForSignInMethod: ApiResponseOptions = {
  description: 'Wrong credentials',
};
const apiResponseForSignInMethod: ApiResponseOptions = {
  description: 'A token for session control',
  type: SigninTokenResponseDto,
  status: 201,
};

export {
  //controller
  apiTag,
  //signup
  apiInternalServerErrorResponse,
  apiOperationForSignUpMethod,
  apiCreatedResponseForSignUpMethod,
  apiConflictResponseForSignUpMethod,
  apiBadRequestResponseForSignUpMethod,
  //signin
  ApiOperationForSignInMethod,
  apiUnauthorizedResponseForSignInMethod,
  apiResponseForSignInMethod,
};
