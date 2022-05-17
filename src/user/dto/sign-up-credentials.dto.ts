import { ApiProperty } from '@nestjs/swagger';
import { Matches, MaxLength, MinLength } from 'class-validator';

const regex = /^\S+$/;

class SignUpCredentialsDto {
  @ApiProperty({ example: 'Something' })
  name: string;

  @ApiProperty({ example: 'strong_man' })
  @MinLength(3, {
    message: 'Username should have between 3 and 16 characters.',
  })
  @MaxLength(16, {
    message: 'Username should have between 3 and 16 characters.',
  })
  @Matches(regex, { message: "Username can't have spaces." })
  username: string;

  @ApiProperty({ example: 'flower123' })
  password: string;
}
export { SignUpCredentialsDto };
