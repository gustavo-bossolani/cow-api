import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const regex = /^\S+$/;

class ChangePasswordDto {
  @ApiProperty({ example: 'strong_man' })
  @IsDefined()
  @IsString()
  username: string;

  @ApiProperty({ example: 'my_secret' })
  @IsDefined()
  @IsString()
  secret: string;

  @ApiProperty({ example: 'flower123' })
  @ApiProperty({
    example: 'flower123',
    minLength: 8,
    maxLength: 32,
  })
  @MinLength(8, {
    message: 'Password should have between 8 and 32 characters.',
  })
  @MaxLength(32, {
    message: 'Password should have between 8 and 32 characters.',
  })
  @Matches(regex, { message: "Password can't have spaces." })
  newPassword: string;
}

export { ChangePasswordDto };
