import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { UserRepository } from './repositories/user.repository';
import { UserService } from './user.service';

import { User } from 'src/user/entity/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserRepository])],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
