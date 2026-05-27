import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '@/modules/users/users.service';
import { comparePasswordHelper } from '@/helpers/utils';
import { JwtService } from '@nestjs/jwt';
import {
  ChangePasswordAuthDto,
  CodeAuthDto,
  CreateAuthDto,
} from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) {
      throw new UnauthorizedException('Username is incorrect');
    }

    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('password is incorrect');
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user._id };
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  handleRegister = async (registerDto: CreateAuthDto) => {
    //logic đăng ký người dùng mới
    //check email
    //hash password
    return await this.usersService.handleRegister(registerDto);
  };

  checkCode = async (data: CodeAuthDto) => {
    return await this.usersService.handleActive(data);
  };

  //data is email
  retryActive = async (data: string) => {
    return await this.usersService.retryActive(data);
  };

  retryPassword = async (data: string) => {
    return await this.usersService.retryPassword(data);
  };

  changePassword = async (data: ChangePasswordAuthDto) => {
    return await this.usersService.changePassword(data);
  };

  // async signIn(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findByEmail(username);

  //   if (!user) {
  //     throw new UnauthorizedException('Username is incorrect');
  //   }

  //   const isValidPassword = await comparePasswordHelper(pass, user.password);
  //   if (!isValidPassword) {
  //     throw new UnauthorizedException('password is incorrect');
  //   }

  //   // if (!user) return null;

  //   // return user;

  //   // const payload = { sub: user._id, username: user.email };
  //   // return {
  //   //   access_token: await this.jwtService.signAsync(payload),
  //   // };
  // }
}
