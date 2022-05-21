import { EntityRepository, Repository } from 'typeorm';

import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { SignUpCredentialsDto } from '../dto/sign-up-credentials.dto';

import { User } from 'src/user/entity/user.entity';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  async createUser(signUpCredentials: SignUpCredentialsDto) {
    const { name, password, username, secret } = signUpCredentials;

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
    } catch (error) {
      const POSTGRES_UNIQUE_ERROR_CODE = '23505';
      if (error.code === POSTGRES_UNIQUE_ERROR_CODE) {
        throw new ConflictException('Username already in use.');
      }
      throw new InternalServerErrorException();
    }
  }
}

export { UserRepository };
