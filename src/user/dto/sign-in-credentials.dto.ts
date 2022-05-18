import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

class SignInCredentialsDto {
  @ApiProperty({ example: 'strong_man' })
  @IsString()
  username: string;

  @ApiProperty({ example: 'flower123' })
  @IsString()
  password: string;
}

export { SignInCredentialsDto };
