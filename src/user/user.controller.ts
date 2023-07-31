import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';

import { User } from './entity/user.entity';
import { UserDto } from './dto/user.dto';

import { SessionAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
@UseGuards(SessionAuthGuard)
export class UserController {
  @Get()
  getAllStatements(@GetUser() { name, username }: User): UserDto {
    return { name, username };
  }
}
