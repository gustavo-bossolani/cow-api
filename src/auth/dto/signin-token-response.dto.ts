import { ApiProperty } from '@nestjs/swagger';

class SigninTokenResponseDto {
  @ApiProperty({ example: 'A cute jwt token.' })
  access: string;
}

export { SigninTokenResponseDto };
