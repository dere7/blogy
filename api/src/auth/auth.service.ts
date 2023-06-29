import { ForbiddenException, Injectable } from '@nestjs/common';
import { Credentials } from './dto/credentials.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePwd } from 'src/utils';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: Credentials) {
    const user = await this.userService.findOneByEmail(email);
    if (user && (await comparePwd(password, user.password))) {
      const payload = { sub: user.id, email };
      return { access_token: await this.jwtService.signAsync(payload) };
    } else {
      throw new ForbiddenException('invalid credentials');
    }
  }
}
