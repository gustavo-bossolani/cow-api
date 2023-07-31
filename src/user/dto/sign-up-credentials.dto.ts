import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const regex = /^\S+$/;

class SignUpCredentialsDto {
  @ApiProperty({ example: 'Something' })
  name: string;

  @ApiProperty({
    example: 'strong_man',
    minLength: 3,
    maxLength: 16,
    uniqueItems: true,
  })
  @MinLength(3, {
    message: 'Username should have between 3 and 16 characters.',
  })
  @MaxLength(16, {
    message: 'Username should have between 3 and 16 characters.',
  })
  @Matches(regex, { message: "Username can't have spaces." })
  username: string;

  @ApiProperty({
    example: 'flower123',
    minLength: 8,
    maxLength: 32,
  })
  @IsString()
  @MinLength(8, {
    message: 'Password should have between 8 and 32 characters.',
  })
  @MaxLength(16, {
    message: 'Password should have between 8 and 32 characters.',
  })
  @Matches(regex, { message: "Password can't have spaces." })
  password: string;

  @ApiProperty({ example: 'TopSecret51' })
  secret: string;
}
export { SignUpCredentialsDto };
