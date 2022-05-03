import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';

import { User } from './entity/user.entity';

import { UserRepository } from './repositories/user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return await this.userRepository.createUser(signUpCredentials);
  }

  async verifyUserCredentials(
    signInCredentials: SignInCredentialsDto,
  ): Promise<User> {
    const { password, username } = signInCredentials;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }

    throw new UnauthorizedException('Check your credentials.');
  }
}
