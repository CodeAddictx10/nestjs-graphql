import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash, verify } from 'argon2';
import { LoginInput } from './dto/login.input';
import { JwtService } from '@nestjs/jwt';
import { Auth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginInput): Promise<Auth> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatched = await verify(user.password, password);

    if (!passwordMatched) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
