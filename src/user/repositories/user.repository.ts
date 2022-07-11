import { EntityRepository, Repository } from 'typeorm';

import {
  ConflictException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from '../dto/sign-up-credentials.dto';

import { User } from 'src/user/entity/user.entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  private logger = new Logger('UserRepository');

  async createUser(signUpCredentials: SignUpCredentialsDto) {
    const { name, password, username, secret } = signUpCredentials;

    this.logger.log(`Generating user.`);

    const passwordSalt = await bcrypt.genSalt();
    const secretSalt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, passwordSalt);
    const hashedSecret = await bcrypt.hash(secret, secretSalt);

    const user = this.create({
      name,
      password: hashedPassword,
      secret: hashedSecret,
      username,
    });

    try {
      await this.save(user);
      this.logger.log(`User ${user.username} created.`);
    } catch (error) {
      const POSTGRES_UNIQUE_ERROR_CODE = '23505';
      if (error.code === POSTGRES_UNIQUE_ERROR_CODE) {
        throw new ConflictException(`Username ${username} already in use.`);
      }
      throw new InternalServerErrorException();
    }
  }
}

export { UserRepository };
