import { Matches, MaxLength, MinLength } from 'class-validator';

const regex = /^\S+$/g;

class SignUpCredentialsDto {
  name: string;

  @MinLength(3, {
    message: 'Username should have between 3 and 16 characters.',
  })
  @MaxLength(16, {
    message: 'Username should have between 3 and 16 characters.',
  })
  @Matches(regex, { message: "Username can't have spaces." })
  username: string;
  password: string;
}
export { SignUpCredentialsDto };
