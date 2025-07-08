import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { JwtPayload } from './types';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async login(user: UserDto) {
    const payload = { sub: user.id, email: user.email, name: user.name };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async refreshToken(token: string) {
    const { sub, email, name } = this.jwtService.decode(token) as JwtPayload;

    return this.jwtService.sign({ sub, email, name });
  }

  async validateUserByPassword(email: string, password: string) {
    const user = await this.userService.findOneByEmail(email);

    const passwordMatch = await this.userService.comparePassword(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
