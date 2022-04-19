import { IsString } from 'class-validator';

class SignInCredentialsDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export { SignInCredentialsDto };
