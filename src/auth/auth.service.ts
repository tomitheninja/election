import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginInput, LoginResult } from './auth.dto';
import { JwtPayload } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async login({ email, password }: LoginInput): Promise<LoginResult> {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException('Unknown user');

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Wrong password');
    }

    return { access_token: this.jwtService.sign({ u: user.id } as JwtPayload) };
  }
}
