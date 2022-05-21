import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

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
  @IsDefined()
  @IsString()
  newPassord: string;
}

export { ChangePasswordDto };
