import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from './dto/sign-up-credentials.dto';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';

import { User } from './entity/user.entity';

import { UserRepository } from './repositories/user.repository';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  private logger = new Logger('UserService');

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(signUpCredentials: SignUpCredentialsDto): Promise<void> {
    return await this.userRepository.createUser(signUpCredentials);
  }

  async changePassword(changePasswordDto: ChangePasswordDto): Promise<void> {
    this.logger.log(`Searching for user ${changePasswordDto.username}.`);

    const { newPassword, secret, username } = changePasswordDto;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(secret, user.secret))) {
      const passwordSalt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, passwordSalt);

      Object.assign(user, { ...user, password: hashedPassword });
      await this.userRepository.save(user);
      this.logger.log('Password changed.');
    } else {
      throw new UnauthorizedException('Check your credentials.');
    }
  }

  async verifyUserCredentials(
    signInCredentials: SignInCredentialsDto,
  ): Promise<User> {
    this.logger.log(
      `Verifying user credentials for user ${signInCredentials.username}.`,
    );

    const { password, username } = signInCredentials;

    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      this.logger.log('User verified.');

      return user;
    }

    throw new UnauthorizedException('Check your credentials.');
  }
}
