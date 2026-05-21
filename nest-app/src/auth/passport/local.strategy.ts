import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  //logic thực hiện gán username và password vào req.body
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException({ message: 'Invalid credentials' });
    }

    if (user.isActive === false) {
      throw new BadRequestException({
        message:
          'your account is not active yet, please check your email to activate your account',
      });
    }

    return user;
  }
}
