import { DefineError } from 'src/shared/models/define-error.model';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserRepository } from 'src/user/repositories/user.repository';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';

import { User } from 'src/user/entity/user.entity';

@Injectable()
class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      secretOrKey: 'topSecret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayloadDto): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });

    if (!user) {
      throw new UnauthorizedException(new DefineError('User not found.', 401));
    }

    return user;
  }
}

export { JwtStrategy };
